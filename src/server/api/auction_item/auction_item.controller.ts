import { Request, Response } from 'express';
import { IAuctioneer } from '../../db/repos/auctioneers.interface'

import dbProvider = require('../../db');


export class AuctionItemController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  }

  public count = () => {

    return this.db.auctionItems.count(this.req.params.auctionId).then(count => {

      this.res.status(200).json({
        success: true,
        data:count
      });

    });
  };

  public pager = () => {

    return this.db.auctionItems.pager(this.req.params.auctionId,
      this.req.params.limit,
      this.req.params.offset).then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });
  };

public favorites = () => {
  return this.db.auctionItems.findFavorites(this.req.params.auctionId).then(data => {

    this.res.status(200).json({
      success: true,
      data:data
    });

  });

};
  public save = () => {

    if(this.req.body.auction_id)
      this.req.body.auction_id = parseInt(this.req.body.auction_id);

    return this.db.auctionItems.save(this.req.body).then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });
    });
  };

  public updateWatch = () => {
console.log(this.req.params)
    return this.db.auctionItems.setWatch(this.req.params.id,
      this.req.params.watch).then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });
  };


}
