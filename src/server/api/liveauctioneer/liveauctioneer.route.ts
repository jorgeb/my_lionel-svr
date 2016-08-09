import { Router, Request, Response } from 'express';

import { LiveAuctioneerController } from './liveauctioneer.controller';

const liveautioneerRouter = Router();

liveautioneerRouter.get('/steam-tender-images', (req: Request, res: Response, next: Function) => {

  let lc = new LiveAuctioneerController(req, res, next);
  return lc.getSteamTenderImage();

});


export { liveautioneerRouter };