import { Router, Request, Response } from 'express';

import { TenderController } from './tender.controller';

const tenderRouter = Router();

tenderRouter.get('/types', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.allTypes();

});

tenderRouter.get('/types/:type', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.getByTypes();

});

tenderRouter.get('/images/:id', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.getImagesById();

});

tenderRouter.get('/my-items-images/:inCatalog', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.getMyTenders();

});

tenderRouter.get('/my-steam-tender', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.getCompleteSteamTender();

});

tenderRouter.post('/set-default-image', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.setImageDefault();

});

tenderRouter.post('/save-extended-tender', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.saveExtendedTender();

});

tenderRouter.post('/set-assoc', (req: Request, res: Response, next: Function) => {

  let tc = new TenderController(req, res, next);
  return tc.setAssoc();

});

export { tenderRouter };