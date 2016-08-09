import sqlProvider = require('../sql');
let sql = sqlProvider.my_lionel_items;

/*
 This repository mixes hard-coded and dynamic SQL,
 primarily to show a diverse example of using both.
 */

export class Repository {

  constructor(db) {
    this.db = db;
  }

  private db:any;

  // Removes all records from the table;
  //empty = () => this.db.none(sql.empty);

  all = () => this.db.any('SELECT * FROM my_lionel_items ORDER by id');
  allForFilter = () => this.db.any(`
  SELECT
	  myi.*, li.lionel_id ext_lionel_id, li.name, fmyli.*
  FROM 
	  my_lionel_items myi 
  INNER JOIN
	  lionel_items li ON li.id = myi.lionel_id
  INNER JOIN
	  (SELECT my_lionel_items_id, MIN(image_url) my_image_url FROM my_lionel_images GROUP BY my_lionel_items_id) AS fmyli ON fmyli.my_lionel_items_id = myi.id
  ORDER BY lpad(li.lionel_id, 10, '0')`);

  public find = (id) => this.db.any(`
  SELECT
	  *
  FROM 
	  my_lionel_items
  WHERE id = $1`, [id]);
  
  private empty = {
    updated: new Date(),
  }; 

  public findImage = (id,imgUrl) => this.db.any(`
  SELECT
	  *
  FROM 
	  my_lionel_images
  WHERE my_lionel_items_id = $1 AND image_url = $2`, [id,imgUrl]);
  

  public getByLionelType = (linel_type_id) => this.db.any(`
    SELECT
	li.id lionel_item_id,  
	li.lionel_id,
	li.name,
	li.info,
	li.url tandem_url,
	li.image_url lionel_item_img_url,
	mli.box_id,
	mlii.*, 
	mb.image_url box_image_url,
	myasoc.arr_image_url_asoc,
	myliextend.arr_image_url_extend
FROM
	lionel_items li 
      
LEFT JOIN 
	my_lionel_items mli ON mli.lionel_id = li.id
/*Img default*/
LEFT JOIN (
	SELECT my_lionel_items_id , MIN(image_url) my_lionel_items_image_def
	FROM my_lionel_images GROUP BY 1) mlii ON mlii.my_lionel_items_id = mli.id
LEFT JOIN my_boxes mb on mb.id = mli.box_id
/*extra img*/
LEFT JOIN (
	SELECT  my_lionel_items_id, array_to_string(array_agg(distinct image_url),',') AS arr_image_url_extend
	FROM 
		my_lionel_images mlii
	GROUP BY 1
	) myliextend ON myliextend.my_lionel_items_id = mli.id
/*Image for asoc*/
LEFT JOIN (
	SELECT  lionel_id_1, array_to_string(array_agg(distinct my_lionel_items_image_def),',') AS arr_image_url_asoc
	FROM my_lionel_items_assoc mlia
	INNER JOIN 
	(SELECT
		my_lionel_items_id , 
		MAX(image_url) my_lionel_items_image_def
	FROM 
		my_lionel_images 
	GROUP BY 1) mlii ON mlii.my_lionel_items_id = mlia.lionel_id_2
	GROUP BY lionel_id_1
	) myasoc ON myasoc.lionel_id_1 = mli.id
WHERE li.lionel_type_id = $1
AND
	NOT EXISTS (select '' from my_lionel_items_assoc where lionel_id_2 = mli.id)

ORDER BY lpad(li.lionel_id, 10, '0')`, [linel_type_id]);
  
  private updateImage = `UPDATE my_lionel_images SET image_url = $1`;
  private addImage = `INSERT INTO my_lionel_images (my_lionel_items_id, image_url) VALUES ($1, $2) returning *`;
  
  public save = (values) => {
      
    let toSave = Object.assign({}, this.empty, values);
//resolve(file);
    return new Promise(
      (resolve:(str:any)=>void, reject:(str:string)=>void) => {
        
        this.find(toSave.id).then((myLionelItems) => {
          let action;
          if (myLionelItems.length > 0) {
            action = this.db.one(sql.update, toSave);
          } else {
            action = this.db.one(sql.add, toSave);
          }

          action.then(myLionelItem => {

            this.findImage(myLionelItem.id, toSave.image_url).then(img => {
              if (img.length === 0) {
                this.db.one(this.addImage, [myLionelItem.id, toSave.image_url]).then(imgSaved => {

                  resolve({ myLionelItem: myLionelItem, image: imgSaved });
                });
              }

            });

          })
        });
    
    });
  };
}
