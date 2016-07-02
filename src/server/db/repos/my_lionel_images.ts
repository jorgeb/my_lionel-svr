//import sqlProvider = require('../sql');
//let sql = sqlProvider.my_boxes;

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

  all = () => this.db.any('SELECT * FROM my_lionel_images ORDER by image_url');

}
