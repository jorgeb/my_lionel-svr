import { Request, Response } from 'express';
import { IAuctioneer } from '../../db/repos/auctioneers.interface';
import { AmbrosebauerUtil } from '../ambrosebauer/ambrosebauer-util';

export class AmbrosebauerController {

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public parserFromOrigin = () => {

    return Promise.resolve()
      .then(() => {

        let au = new AmbrosebauerUtil();

        return au.parserSite(this.req.params.auctionId,
          this.req.params.from,
          this.req.params.to).then(data => {

            this.res.status(200).json({
              success: true,
              data: data
            });
          })
          .catch(error => this.next(error));
      });
  }
}