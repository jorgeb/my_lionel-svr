import { Request, Response } from 'express';

import { MyLionelUploadedUtils } from './my_lionel_uploaded.utils';
import dbProvider = require('../../db');

export class MyLionelUploadedController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public stockImages = () => {

    return Promise.resolve(
        this.res.status(200).json({
            success: true,
            data:MyLionelUploadedUtils.rawImages()
        }) 
    );
  }

  public boxesImages = () => {

    return this.db.myLionelBoxes.all().then(data => {

      this.res.status(200).json({
        success: true,
        data: data.map((box) => {
            return box.image_url;
        })
      });
    });
  }

  public myCatalogImages = () => {

    return this.db.myLionelImages.all().then(data => {

      this.res.status(200).json({
        success: true,
        data: data.map((myImages) => {
            return myImages.image_url;
        })
      });
    });
  }
  
  public processImages = () => {

    return Promise.all([this.db.myLionelImages.all(),
        this.db.myLionelBoxes.all(),
        MyLionelUploadedUtils.rawImages()]).then(values => { 
        
        this.res.status(200).json({
            success: true,
            data: {
                myLionelImages:values[0],
                myLionelBoxes:values[1],
                stockImages:values[2],
                noProcessed:values[2].filter((item) => {
                    return !values[0].some(si => {
                        return si.image_url === item
                    }) && !values[1].some(si => {
                        return si.image_url === item
                    });
                })
            } 
        });
      
    });    
  }
  
 
}
