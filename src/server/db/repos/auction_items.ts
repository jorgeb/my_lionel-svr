import sqlProvider = require('../sql');

let sql = sqlProvider.auctionItems;

/*
 This repository mixes hard-coded and dynamic SQL,
 primarily to show a diverse example of using both.
 */

export class Repository {

  public empty = {
    auction_id:0,
    title:null,
    info:null,
    url:null,
    image_url:null,
    extra_images_url:null,
    end_bid:null,
    current_bid:null,
    current_max_bidder:null,
    sort_order:0,
    external_id:null
  };

  constructor(db) {
    this.db = db;
  }

  private db:any;

  private setToNull = (prop) => {

    let ret = prop;
    if (prop && (typeof prop === 'string') && (prop.length == 0) ) {
      ret = null;
    }

    return ret;
  };

  public save = (values) => {

    let toSave = Object.assign({},this.empty,values);

    return this.findByExternalId(toSave.auction_id, toSave.external_id).then((auctionItem) => {

      if(auctionItem.length > 0) {

        toSave = Object.assign({},auctionItem[0],toSave);
        console.log('findByExternalId',toSave);
        return this.db.any(sql.update, toSave);
      } else {
        return this.db.one(sql.add, toSave);
      }

    });
  };

  public count = (AuctionId) => {

    return this.db.one(`
    SELECT
      COUNT(*)
    FROM
      auction_items ai
    WHERE ai.auction_id = $1
    AND title IS NOT NULL`,
      [AuctionId]);
  }

  public pager = (auctionId, limit,  offset) => {

    return this.db.any(`
    SELECT
      ai.*
    FROM
      auction_items ai
    WHERE ai.auction_id = $1
    AND title IS NOT NULL
    ORDER BY lpad(external_id, 10, '0')
    LIMIT $2 OFFSET $3`,
      [auctionId, limit,  offset]);
  };


  public allByAuctionId = (AuctionId) => {

    return this.db.any(`
    SELECT
      ai.*, a.id auction_id, a.name auction_name, a.external_id auction_external_id, ats.name auctioneer_name
    FROM
      auction_items ai
    INNER JOIN
      auctions a ON a.id = ai.auction_id
    INNER JOIN
      auctioneers ats ON ats.id = a.auctioneer_id
    WHERE a.id = $1
    AND title IS NOT NULL`,
      [AuctionId]);
  }

  public findFavorites = (auctionId) => {

    return this.db.any("SELECT * FROM auction_items WHERE auction_id = $1 AND to_watch = true ORDER BY lpad(external_id, 10, '0')",
      [auctionId]);
  }

  public find = (id) => {

    return this.db.oneOrNone(`
    SELECT
      ai.*, a.id auction_id, a.name auction_name, a.external_id auction_external_id, ats.name auctioneer_name
    FROM
      auction_items ai
    INNER JOIN
      auctions a ON a.id = ai.auction_id
    INNER JOIN
      auctioneers ats ON ats.id = a.auctioneer_id
    WHERE ai.id = $1`,
      [id]);
  }

  public setWatch = (auctionId, toWatch) => {

    return this.db.any("UPDATE auction_items SET to_watch = $2 WHERE id = $1",
      [auctionId, toWatch]);
  }

  public findByExternalId = (auctionId, externalId) => {

    return this.db.any("SELECT * FROM auction_items WHERE auction_id = $1 AND external_id = $2",
      [auctionId, externalId]);
  }
}
