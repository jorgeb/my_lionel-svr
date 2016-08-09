import sqlProvider = require('../sql');

let sql = sqlProvider.my_boxes;

/*
 This repository mixes hard-coded and dynamic SQL,
 primarily to show a diverse example of using both.
 */

export class Repository {

  private empty = {
    qr: null,
    sort: 5
  };

  constructor(db) {
    this.db = db;
  }

  private db: any;

  // Removes all records from the table;
  //empty = () => this.db.none(sql.empty);

  all = () => this.db.any('SELECT * FROM my_boxes ORDER by sort');
  
  private find = (boxId) => this.db.any('SELECT * FROM my_boxes WHERE id = $1 ORDER by sort', [boxId]);

  public save = (values) => {

    let toSave = Object.assign({}, this.empty, values);

    return this.find(toSave.id).then((box) => {

      if (box.length > 0) {
        return this.db.any(sql.update, toSave);
      } else {
        return this.db.one(sql.add, toSave);
      }
    });
  };


}
