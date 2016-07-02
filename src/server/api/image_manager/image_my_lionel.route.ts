import { Router, Request, Response } from 'express';

import { ImageMyLionelController } from './image_my_lionel.controller';

const imageMyLionelRouter = Router();

imageMyLionelRouter.get('/stock/:width/:height/:fileName', (req: Request, res: Response, next: Function) => {

  let imlc = new ImageMyLionelController(req, res, next);
  return imlc.findStockImage();

});

export { imageMyLionelRouter };