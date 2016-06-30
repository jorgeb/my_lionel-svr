import { Router, Request, Response } from 'express';

import { TandemController } from './tandem.controller';

const tandemParserRouter = Router();

tandemParserRouter.get('/parser-index', (req: Request, res: Response, next: Function) => {

  let tbc = new TandemController(req, res, next);
  return tbc.parserFromOrigin();

});

tandemParserRouter.get('/parser-items', (req: Request, res: Response, next: Function) => {

  let tbc = new TandemController(req, res, next);
  return tbc.parserItems();

});

tandemParserRouter.get('/tenders', (req: Request, res: Response, next: Function) => {

  let tbc = new TandemController(req, res, next);
  return tbc.tenders();

});

tandemParserRouter.get('/tenders/images', (req: Request, res: Response, next: Function) => {

  let tbc = new TandemController(req, res, next);
  return tbc.tendersImagesFromLiveauctioneers();

});




export { tandemParserRouter };