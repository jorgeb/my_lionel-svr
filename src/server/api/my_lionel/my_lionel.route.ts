import { Router, Request, Response } from 'express';

import { MyLionelUploadedController } from './my_lionel_uploaded.controller';
import { MyLionelItemsController } from './my_lionel.controller';
import { MyBoxesController } from './my_lionel_boxes.controller';

const mylionelUploadedParserRouter = Router();

mylionelUploadedParserRouter.get('/boxes', (req: Request, res: Response, next: Function) => {

  let mb = new MyBoxesController(req, res, next);
  return mb.all();

});

mylionelUploadedParserRouter.post('/boxes', (req: Request, res: Response, next: Function) => {

  let mb = new MyBoxesController(req, res, next);
  return mb.save();

});

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

mylionelUploadedParserRouter.get('/items-for-filter', (req: Request, res: Response, next: Function) => {

  let mli = new MyLionelItemsController(req, res, next);
  return mli.allForFilter();
  
});

mylionelUploadedParserRouter.get('/items-by-type/:lionelTypeId', (req: Request, res: Response, next: Function) => {

  let mli = new MyLionelItemsController(req, res, next);
  return mli.getByLionelType();

});

mylionelUploadedParserRouter.post('/items', (req: Request, res: Response, next: Function) => {

  let mli = new MyLionelItemsController(req, res, next);
  return mli.save();

});

export { mylionelUploadedParserRouter };