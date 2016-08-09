import { Request, Response } from 'express';
import dbProvider = require('../../db');

export class TenderController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public allTypes = () => {
    
    return this.db.lionelSteamTenders.types().then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  }
  
  public getByTypes = () => {

      return this.db.lionelSteamTenders.getByTypes(this.req.params.type).then(data => {

        this.res.status(200).json({
          success: true,
          data: data
        });
      });
  }

  public getImagesById = () => {

      return this.db.lionelSteamTenders.getImagesById(this.req.params.id).then(data => {

        this.res.status(200).json({
          success: true,
          data: data
        });
      });
  }

  public getMyTenders = () => {

      return this.db.lionelSteamTenders.getMyTenders(this.req.params.inCatalog).then(data => {

        this.res.status(200).json({
          success: true,
          data: data
        });
      });
  }

  public saveExtendedTender = () => {

    return this.db.lionelSteamTenders.saveExtendedTender(this.req.body).then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  } 

  public getCompleteSteamTender = () => {
      return this.db.lionelSteamTenders.getAllSteamTender().then(data => {

        this.res.status(200).json({
          success: true,
          data: data
        });
      });  
  }
  
  public setAssoc = () => {
        
        return this.db.lionelSteamTenders.setAssoc(this.req.body).then(data => {

        this.res.status(200).json({
          success: true,
          data: data
        });
      });
  }
  
  public setImageDefault = () => {

    return this.db.lionelSteamTenders.setDefaultImage(this.req.body).then(data => {

      this.res.status(200).json({
        success: true,
        data: data
      });
    });
  } 

 
}