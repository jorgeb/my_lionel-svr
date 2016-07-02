import { Router, Request, Response } from 'express';

import { MyLionelUploadedController } from './my_lionel_uploaded.controller';

const mylionelUploadedParserRouter = Router();

mylionelUploadedParserRouter.get('/stock-images', (req: Request, res: Response, next: Function) => {

  let mlu = new MyLionelUploadedController(req, res, next);
  return mlu.stockImages();

});

mylionelUploadedParserRouter.get('/boxes-images', (req: Request, res: Response, next: Function) => {

  let mlu = new MyLionelUploadedController(req, res, next);
  return mlu.boxesImages();

});

mylionelUploadedParserRouter.get('/my-catalog-images', (req: Request, res: Response, next: Function) => {

  let mlu = new MyLionelUploadedController(req, res, next);
  return mlu.myCatalogImages();

});

mylionelUploadedParserRouter.get('/process-images', (req: Request, res: Response, next: Function) => {

  let mlu = new MyLionelUploadedController(req, res, next);
  return mlu.processImages();

});

export { mylionelUploadedParserRouter };