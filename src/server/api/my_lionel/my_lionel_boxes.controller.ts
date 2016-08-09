import { Request, Response } from 'express';
import dbProvider = require('../../db');

export class MyBoxesController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public all = () => {

    return this.db.myLionelBoxes.all().then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  }
  
  public save = () => {

    return this.db.myLionelBoxes.save(this.req.body).then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  } 
 
}
