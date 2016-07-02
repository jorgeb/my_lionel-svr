import { Request, Response } from 'express';
import * as http from 'http'
import * as requestTS from 'request'
import * as fs from 'fs'

import { ImageMyLionelUtil } from './image_my_lionel-util';

export class ImageMyLionelController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public findStockImage = () => {

    let imlu = new ImageMyLionelUtil();

    return imlu.getImage(this.req.params.fileName,
      this.req.params.width,
      this.req.params.height).then( data => {
      
      this.res.sendFile(data, { root: 'src/server/img/my_lionel_cache' });
    });

  };

}