import { Router, Request, Response } from 'express';

import { ImageAuctionController } from './image_auction.controller';

const imageAuctionRouter = Router();

imageAuctionRouter.get('/square/:auctionItemId/:width', (req: Request, res: Response, next: Function) => {

  let iac = new ImageAuctionController(req, res, next);
  return iac.findSquare();

});

imageAuctionRouter.get('/:auctionItemId/:width/:height', (req: Request, res: Response, next: Function) => {

  let iac = new ImageAuctionController(req, res, next);
  return iac.find();

});

export { imageAuctionRouter };
