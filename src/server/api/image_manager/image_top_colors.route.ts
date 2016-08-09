import { Router, Request, Response } from 'express';

import { ImageTopColorsController } from './image_top_colors.controller';

const imageTopColorsRouter = Router();

imageTopColorsRouter.get('/histogram/:fileName', (req: Request, res: Response, next: Function) => {

  let itcc = new ImageTopColorsController(req, res, next);
  return itcc.getHistogram();

});

imageTopColorsRouter.get('/all_histogram', (req: Request, res: Response, next: Function) => {

  let itcc = new ImageTopColorsController(req, res, next);
  return itcc.processAllHistogram();

});

export { imageTopColorsRouter };