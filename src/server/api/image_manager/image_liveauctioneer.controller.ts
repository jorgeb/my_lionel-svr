import { Request, Response } from 'express';
import * as http from 'http'
import * as requestTS from 'request'
import * as fs from 'fs'

import { ImageLiveauctioneerUtil } from './image_liveauctioneer-util';

export class ImageLiveauctioneerController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public findLiveauctioneerImage = () => {

    let imlu = new ImageLiveauctioneerUtil();

    return imlu.getImage(this.req.params.fileName,
      this.req.params.width,
      this.req.params.height).then( data => {
      
      this.res.sendFile(data, { root: 'src/server/img/liveauctioneer_cache' });
    });

  };

}