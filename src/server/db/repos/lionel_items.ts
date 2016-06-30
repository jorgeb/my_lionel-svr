
import sqlProvider = require('../sql');

let sql = sqlProvider.lionelItems;

export class Repository {

  public empty = {
  lionel_id:null,
  lionel_type_id:1,
  name:null,
  info:null,
  info_html:null,
  updated:null,
  url:null,
  image_url:null,
  ins_image_url:null,
  fav_type:null
  };

  constructor(db) {
    this.db = db;
  }

  private db:any;

  

  public save = (values) => {

    let toSave = Object.assign({},this.empty,values);

    return this.findByLionelId(toSave.lionel_id).then((lionelItem) => {

      if(lionelItem.length > 0) {
        return this.db.any(sql.update, toSave);
      } else {
        return this.db.one(sql.add, toSave);
      }

    });
  };

 
  public findByLionelId = (lionelId) => {

    return this.db.any(`
    SELECT
      *
    FROM
      lionel_items
    WHERE lionel_id = $1`,
      [lionelId]);
  }

 public findByType = (lionelTypeId, limit?,  offset?) => {

    return this.db.any(`
    SELECT
      *
    FROM
      lionel_items 
    WHERE lionel_type_id = $1
    ORDER BY lionel_id`,
      [lionelTypeId, limit,  offset]);
  };

 public types = () => {

    return this.db.any(`
    SELECT
      *
    FROM
      lionel_types 
    ORDER BY id`);
  };
  
  public find = (id) => {

    return this.db.oneOrNone(`
    SELECT
      *
    FROM
      lionel_items
    WHERE id = $1`,
      [id]);
  }

  public all = () => {

    return this.db.any(`
    SELECT
      *
    FROM
      lionel_items`);
  }

  public allForAutoComplete = () => {

    return this.db.any(`
    SELECT
      id,lionel_id,lionel_type_id,name,url,image_url,fav_type
    FROM
      lionel_items
     ORDER BY lpad(lionel_id, 10, '0')`);
  }

}