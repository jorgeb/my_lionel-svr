import { Router, Request, Response } from 'express';

import { AuctionItemController } from './auction_item.controller';

const auctioneerItemRouter = Router();

auctioneerItemRouter.post('/', (req: Request, res: Response, next: Function) => {

  let aic = new AuctionItemController(req, res, next);
  return aic.save();

});

auctioneerItemRouter.get('/:auctionId/count', (req: Request, res: Response, next: Function) => {

  let aic = new AuctionItemController(req, res, next);
  return aic.count();

});

auctioneerItemRouter.get('/:auctionId/favorites', (req: Request, res: Response, next: Function) => {

  let aic = new AuctionItemController(req, res, next);
  return aic.favorites();

});

auctioneerItemRouter.get('/:auctionId/pager/:limit/:offset', (req: Request, res: Response, next: Function) => {

  let aic = new AuctionItemController(req, res, next);
  return aic.pager();

});

auctioneerItemRouter.get('/:id/setwatch/:watch', (req: Request, res: Response, next: Function) => {

  let aic = new AuctionItemController(req, res, next);
  return aic.updateWatch();

});

export { auctioneerItemRouter };
