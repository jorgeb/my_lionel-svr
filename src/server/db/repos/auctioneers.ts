import sqlProvider = require('../sql');

let sql = sqlProvider.auctioneers;

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

  add = values =>
    this.db.one(sql.add, values)
      .then(auctioneer => auctioneer.id);

  remove = id => this.db.result(sql.delete, id)
    .then(result => result.rowCount);

  find = id => this.db.oneOrNone('SELECT * FROM auctioneers WHERE id = $1', id);

  all = () => this.db.any(sql.all);

  total = () => this.db.one('SELECT count(*) FROM auctioneers')
    .then(data => parseInt(data.count));
}
