import { Request, Response } from 'express';
import dbProvider = require('../../db');

export class MyLionelItemsController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public allForFilter = () => {

    return this.db.myLionelItems.allForFilter().then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  }
  
  public getByLionelType = () => {

    return this.db.myLionelItems.getByLionelType(this.req.params.lionelTypeId).then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  }
  
  
  
  public save = () => {

    return this.db.myLionelItems.save(this.req.body).then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  } 

}