import { Router, Request, Response } from 'express';

import { ImageLiveauctioneerController } from './image_liveauctioneer.controller';

const imageLiveauctioneerRouter = Router();

imageLiveauctioneerRouter.get('/:width/:height/:fileName', (req: Request, res: Response, next: Function) => {

  let imlc = new ImageLiveauctioneerController(req, res, next);
  return imlc.findLiveauctioneerImage();

});

export { imageLiveauctioneerRouter };