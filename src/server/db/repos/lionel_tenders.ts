
import sqlProvider = require('../sql');

let sql = sqlProvider.lionelTenders;

export class Repository {

  public empty = {
  lionel_id:null,
  title:null,
  link:null,
  snippet:null,
  htmlSnippet:null,
  pagemap_cse_image_src:null
  };

  constructor(db) {
    this.db = db;
  }

  private db:any;

  public getLocomotives = () => {

     return this.db.any(`
    select substring(title,15,length(title) - 25) loco_lionel_id,title,id, lionel_id 
    from lionel_tenders 
    where title like '%LOCOMOTIVE'`);
  };

  public updateLiveauctioneersImages = (id, images, desc) => {

     return this.db.any(`
    UPDATE  lionel_tenders
    SET liveauctioneers_images = $2,
    liveauctioneers_images_desc = $3
    where id = $1`, [id, images, desc]);
  };
      
  public save = (values) => {

    let toSave = Object.assign({},this.empty,values);

     return this.db.one(sql.add, toSave);
  };

}