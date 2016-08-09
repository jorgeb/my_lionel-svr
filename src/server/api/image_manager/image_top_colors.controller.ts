import { Request, Response } from 'express';
import * as http from 'http'
import * as requestTS from 'request'
import * as fs from 'fs'

import { ImageTopColorsUtil } from './image_top_colors-util';

export class ImageTopColorsController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public getHistogram = () => {

    let imtc = new ImageTopColorsUtil();

    return imtc.getHistogram (this.req.params.fileName).then( data => {
      
      this.res.sendFile(data, { root: 'src/server/img/histogram_info' });
    });

  };

  public processAllHistogram = () => {

    let imtc = new ImageTopColorsUtil();

    return imtc.getAllHistogram().then( data => {
      
       this.res.status(200).json({
        success: true,
        data:data
      });
     
    });

  };

}