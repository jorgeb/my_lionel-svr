import { Request, Response } from 'express';

import dbProvider = require('../../db');

export class LionelController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  
  public items = () => {

    return this.db.lionelItems.all().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });

  }

  public itemsAutoComplete = () => {

    return this.db.lionelItems.allForAutoComplete().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });

  }


  public itemsByType = () => {

    return this.db.lionelItems.findByType(this.req.params.lionelTypeId).then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });

  }

  public types = () => {

    return this.db.lionelItems.types().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });

    });

  }
 
}