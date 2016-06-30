import { Router, Request, Response } from 'express';

import { AuctioneerController } from './auctioneer.controller';

const auctioneerRouter = Router();

auctioneerRouter.get('/', (req: Request, res: Response, next: Function) => {
  return Promise.resolve()
    .then(() => {
      console.log('/*')
      return res.status(200).json(req.params);
    })
    .catch(error => next(error));
});

auctioneerRouter.get('/:id', (req: Request, res: Response, next: Function) => {

  let ac = new AuctioneerController(req, res, next);
  return ac.find();

});

auctioneerRouter.get('/:id/auctions', (req: Request, res: Response, next: Function) => {

  let ac = new AuctioneerController(req, res, next);
  return ac.auctions();

});

export { auctioneerRouter };
