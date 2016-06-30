import { Router, Request, Response } from 'express';

import { ImageLionelController } from './image_lionel.controller';

const imageLionelRouter = Router();

imageLionelRouter.get('/square/:id/:width', (req: Request, res: Response, next: Function) => {

  let ilc = new ImageLionelController(req, res, next);
  return ilc.findSquare();

});

imageLionelRouter.get('/:id/:width/:height', (req: Request, res: Response, next: Function) => {

  let ilc = new ImageLionelController(req, res, next);
  return ilc.find();

});

export { imageLionelRouter };