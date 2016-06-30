import { Router, Request, Response } from 'express';

import { AuctionController } from './auction.controller';

const auctionRouter = Router();

auctionRouter.get('/', (req: Request, res: Response, next: Function) => {

  let ac = new AuctionController(req, res, next);
  return ac.all();

});

auctionRouter.get('/:id/items', (req: Request, res: Response, next: Function) => {

  let ac = new AuctionController(req, res, next);
  return ac.items();

});


export { auctionRouter };