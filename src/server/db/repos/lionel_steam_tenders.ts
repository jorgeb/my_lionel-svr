import sqlProvider = require('../sql');

let sql = sqlProvider.lionelTenderImages;

export class Repository {

  constructor(db) {
    this.db = db;
  }

  private db:any;
    
  public all = () => {

    return this.db.any(`
    SELECT
      *
    FROM
      lionel_steam_tenders`);
  }

  public types = () => {

    return this.db.any(`
    select type_tender,count(*) from lionel_steam_tenders group by 1 order by 2 desc`);
  }

  public getByTypes = (type_tender) => {

    return this.db.any(`
    select lionel_tender_id,max(image_url) from 
      lionel_steam_tenders st
    left outer join 
      lionel_tender_images ti on ti.steam_tender_id = st.id  AND is_default = true
      where type_tender= $1
      group by lionel_tender_id
    order by 1 desc`,type_tender);
  }
  
  public getImagesById = (id)  => {
      return this.db.any(`
    select * from 
      lionel_steam_tenders st
    left outer join 
      lionel_tender_images ti on ti.steam_tender_id = st.id
      where lionel_tender_id = $1
    order by 1 desc`,id);
  } 
  
  public setDefaultImage = (body) => {

    return this.db.any(`
    update lionel_tender_images SET is_default = false where steam_tender_id = $1`,body.steam_tender_id ).then(
      (r) => {
        
        this.db.any(`update lionel_tender_images SET is_default = true where id = $1 returning *`,body.id );
      }
    );
  }

  public getMyTenders = (inCatalog?:boolean) => {

     return this.db.any(`
    SELECT mlii.*, mb.id box_id, mb.image_url box_image_url   FROM my_lionel_items mli
      INNER JOIN lionel_items li on li.id = mli.lionel_id
      INNER JOIN my_lionel_images mlii ON mlii.my_lionel_items_id = mli.id
      INNER JOIN my_boxes mb on mb.id = mli.box_id
      LEFT JOIN my_extended_tender met on met.my_lionel_items_id = mli.id
    where (($1 IS NULL) OR (($1 AND (met.my_lionel_items_id IS NOT NULL)) OR (NOT $1 AND (met.my_lionel_items_id IS NULL))))
    and li.lionel_type_id = 21`, inCatalog);
  };
  
  public saveExtendedTender = (value) => {
    
    return this.db.any(`SELECT * FROM my_extended_tender WHERE my_lionel_items_id = $1`, value.my_lionel_items_id).then( data => {
      if(data.length > 0) {

        return this.db.any(sqlProvider.lionelTenders.updateExtendedTender, value);
      } else {
        return this.db.one(sqlProvider.lionelTenders.addExtendedTender, value);
      }

    });
    
  }
  
  public getAllSteamTender = () => {
  
  return this.db.any(
                  `SELECT
                  lst.*,  
                  mli.box_id,
                  mlii.*, 
                  mb.image_url loco_box_image_url,
                  meti.tender_my_lionel_items_id, 
                  meti.tender_img_url, 
                  meti.tender_box_image_url,
	                mlia.lionel_id_1 tender_in_loco,
	                mlia2.lionel_id_2 loco_with_tender,
	                lti.tender_image
                FROM
                  lionel_steam_tenders lst
                INNER JOIN 
                  lionel_items li ON li.lionel_id = lst.lionel_id
                INNER JOIN 
                  (select lionel_tender_id,max(image_url) tender_image from 
                        lionel_steam_tenders st
                      left outer join 
                        lionel_tender_images ti on ti.steam_tender_id = st.id  AND is_default = true
                        group by lionel_tender_id) lti ON lti.lionel_tender_id = lst.lionel_tender_id
                LEFT JOIN 
                  my_lionel_items mli ON mli.lionel_id = li.id
                LEFT JOIN (
                  SELECT my_lionel_items_id loco_my_lionel_items_id, MIN(image_url) loco_img_url 
                  FROM my_lionel_images GROUP BY 1) mlii ON mlii.loco_my_lionel_items_id = mli.id
                LEFT JOIN my_boxes mb on mb.id = mli.box_id
                LEFT JOIN (SELECT 
                  mli.id tender_my_lionel_items_id,met.lionel_tender_id, tender_img_url, mb.image_url tender_box_image_url
                  FROM my_extended_tender met 
                  INNER JOIN my_lionel_items mli ON mli.id = met.my_lionel_items_id
                  INNER JOIN (SELECT my_lionel_items_id, MIN(image_url) tender_img_url FROM my_lionel_images GROUP BY my_lionel_items_id) mlii ON mlii.my_lionel_items_id = mli.id
                  INNER JOIN my_boxes mb on mb.id = mli.box_id) meti ON meti.lionel_tender_id = lst.lionel_tender_id
                LEFT JOIN 
                  my_lionel_items_assoc mlia ON mlia.lionel_id_2 = meti.tender_my_lionel_items_id
                LEFT JOIN 
                  my_lionel_items_assoc mlia2 ON mlia2.lionel_id_1 = mli.id
                WHERE li.lionel_type_id = 7
                ORDER BY 2,3
                `);
  }
  
  public setAssoc = (value) => {
    
    return this.db.any(`DELETE FROM my_lionel_items_assoc WHERE lionel_id_1 = $1;
    DELETE FROM my_lionel_items_assoc WHERE lionel_id_2 = $2;`, [value.lionel_id_1, value.lionel_id_2]).then( data => {
        
        return this.db.one(sqlProvider.lionelTenders.addAssoc, value);
    });

  };
  
  public saveImage = (value) => {
      
      return this.db.one(sql.addImage, value);
  }

}