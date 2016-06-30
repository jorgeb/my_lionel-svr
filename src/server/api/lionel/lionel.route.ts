import { Router, Request, Response } from 'express';

import { LionelController } from './lionel.controller';

const lionelParserRouter = Router();

lionelParserRouter.get('/auto-complete', (req: Request, res: Response, next: Function) => {

  let lc = new LionelController(req, res, next);
  return lc.itemsAutoComplete();

});


lionelParserRouter.get('/items', (req: Request, res: Response, next: Function) => {

  let lc = new LionelController(req, res, next);
  return lc.items();

});

lionelParserRouter.get('/:lionelTypeId/items', (req: Request, res: Response, next: Function) => {

  let lc = new LionelController(req, res, next);
  return lc.itemsByType();

});

lionelParserRouter.get('/types', (req: Request, res: Response, next: Function) => {

  let lc = new LionelController(req, res, next);
  return lc.types();

});

export { lionelParserRouter };