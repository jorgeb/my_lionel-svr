import { Router, Request, Response } from 'express';

import { PostwarLionelController } from './postwarlionel.controller';

const postwarLionelRouter = Router();

postwarLionelRouter.get('/root-url', (req: Request, res: Response, next: Function) => {

  let plc = new PostwarLionelController(req, res, next);
  return plc.getRootUrl();

});


export { postwarLionelRouter };