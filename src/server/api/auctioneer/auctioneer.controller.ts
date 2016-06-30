import { Request, Response } from 'express';
import { IAuctioneer } from '../../db/repos/auctioneers.interface'

import dbProvider = require('../../db');


export class AuctioneerController {

  private db: any = dbProvider.db;

  constructor(private req: Request,
    private res: Response,
    private next: Function) {

  }

  public find = () => {

    return this.db.auctioneers.find(this.req.params.id).then(data => {

      this.res.status(200).json({
        success: true,
        data
      });
    });

  };

  public auctions = () => {

    return this.db.auctions.findByAuctioneer(this.req.params.id).then(data => {

      this.res.status(200).json({
        success: true,
        data
      });
    });

  };

}