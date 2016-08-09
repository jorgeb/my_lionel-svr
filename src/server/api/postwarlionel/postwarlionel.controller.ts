import { Request, Response } from 'express';
import * as requestTS from 'request'

import { PostwarLionelUtil } from './postwarlionel_util';

export class PostwarLionelController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  };

  public getRootUrl = () => {

    let plu = new PostwarLionelUtil();

    return plu.parserSite().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });
    });

  };

}