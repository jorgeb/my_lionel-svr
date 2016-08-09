import { Request, Response } from 'express';
import * as requestTS from 'request'

import { LiveauctioneerUtil } from './liveauctioneer_util';

export class LiveAuctioneerController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public getSteamTenderImage = () => {

    let lu = new LiveauctioneerUtil();

    return lu.parserSite().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });
    });

  };

}