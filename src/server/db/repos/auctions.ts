
export class Repository {

  constructor(db) {
    this.db = db;
  }

  private db:any;

  public all = () => {

    return this.db.any("SELECT * FROM auctions");
  }

  public find = (auctionId) => {

    return this.db.any("SELECT * FROM auctions WHERE id = $1",
      [auctionId]);
  }
  
  public findByAuctioneer = (auctioneerId) => {

    return this.db.any("SELECT * FROM auctions WHERE auctioneer_id = $1 ORDER BY auction_date",
      [auctioneerId]);
  }

}