import { Request, Response } from 'express';
import * as http from 'http'
import * as requestTS from 'request'
import * as fs from 'fs'

import dbProvider = require('../../db');
import { ImageAuctionUtil } from './image_auction-util';

export class ImageAuctionController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public find = () => {

    let iau = new ImageAuctionUtil();

    return iau.getImage(this.req.params.auctionItemId,
      this.req.params.width,
      this.req.params.height).then( data => {

      this.res.sendFile(data, { root: 'src/server/img/auctions' });
    });
  };

  public findSquare = () => {

    let iau = new ImageAuctionUtil();

    return iau.getSquareImage(this.req.params.auctionItemId,
      this.req.params.width).then( data => {

      this.res.sendFile(data, { root: 'src/server/img/auctions' });
    });
};

}
