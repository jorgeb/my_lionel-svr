import { Request, Response } from 'express';
import * as http from 'http'
import * as requestTS from 'request'
import * as fs from 'fs'

import dbProvider = require('../../db');
import { ImageLionelUtil } from './image_lionel-util';

export class ImageLionelController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public find = () => {

    let ilu = new ImageLionelUtil();

    return ilu.getImage(this.req.params.id,
      this.req.params.width,
      this.req.params.height).then( data => {
      
      this.res.sendFile(data, { root: 'src/server/img/lionel' });
    });

  };
  
  public findSquare = () => {

    let ilu = new ImageLionelUtil();

    return ilu.getSquareImage(this.req.params.id,
      this.req.params.width).then( data => {
      
      this.res.sendFile(data, { root: 'src/server/img/lionel' });
    });

  };


}