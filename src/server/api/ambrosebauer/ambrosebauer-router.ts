import { Router, Request, Response } from 'express';

import { AmbrosebauerController } from './ambrosebauer.controller';

const ambrosebaueItemRouter = Router();

ambrosebaueItemRouter.get('/:auctionId/parser/:from/:to', (req: Request, res: Response, next: Function) => {

  let ambc = new AmbrosebauerController(req, res, next);
  return ambc.parserFromOrigin();

});

export { ambrosebaueItemRouter };