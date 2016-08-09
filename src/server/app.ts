import * as serveStatic from 'serve-static';
import * as express from 'express';
import { Request, Response } from 'express';
import { router as ngRouter } from './ng';

import { auctionRouter } from './api/auction/auction.route';
import { auctioneerRouter } from './api/auctioneer/auctioneer.route';
import { auctioneerItemRouter } from './api/auction_item/auction_item.route';
import { ambrosebaueItemRouter } from './api/ambrosebauer/ambrosebauer-router';
import { liveautioneerRouter } from './api/liveauctioneer/liveauctioneer.route.ts';

import { imageAuctionRouter } from './api/image_manager/image_auction.route';
import { imageLionelRouter } from './api/image_manager/image_lionel.route'; 
import { imageMyLionelRouter } from './api/image_manager/image_my_lionel.route';
import { imageTopColorsRouter } from './api/image_manager/image_top_colors.route';
import { imageLiveauctioneerRouter } from './api/image_manager/image_liveauctioneer.route';

import { tandemParserRouter } from './api/tandem/tandem.router';
import { lionelParserRouter } from './api/lionel/lionel.route';
import { mylionelUploadedParserRouter } from './api/my_lionel/my_lionel.route';
import { tenderRouter } from './api/tender/tender.route';
import { postwarLionelRouter } from './api/postwarlionel/postwarlionel.route';
 
const app = express();

var bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/api/auction/', auctionRouter);
app.use('/api/auctioneer/', auctioneerRouter);
app.use('/api/auction_item/', auctioneerItemRouter);

app.use('/img/auction/', imageAuctionRouter);
app.use('/img/lionel/', imageLionelRouter);
app.use('/img/my_lionel/', imageMyLionelRouter);
app.use('/img/live/', imageTopColorsRouter);
app.use('/img/liveauctioneer/', imageLiveauctioneerRouter);

//app.use('/api/auction/', require('./api/auction'));
app.use('/api/ambrosebauer/', ambrosebaueItemRouter);
app.use('/api/liveauctioneer/', liveautioneerRouter);

app.use('/api/tandem/', tandemParserRouter);
app.use('/api/lionel/', lionelParserRouter);
app.use('/api/my_lionel/', mylionelUploadedParserRouter);

app.use('/api/tender/', tenderRouter);

app.use('/api/postwarlionel/', postwarLionelRouter)
app.use('/', serveStatic(PUBLIC_DIR));
app.use('/', ngRouter);

/**
 * 404 Not Found
 */
app.use((req: Request, res: Response, next: Function) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  return next(err);
});

/**
 * Errors normalization
 */
app.use((err: any, req: Request, res: Response, next: Function) => {
  const status: number = err.status || 500;

  let stack: string = err.message;
  let message: string = err.stack;

  if (message.length > 100) {
    stack = message + (stack ? ('\n\n' + stack) : '');
    message = 'Server Error';
  }

  return next({ status, message, stack });
});

/**
 * Development error handler.
 * Print error message with a stacktrace.
 *

 feature/nybble/jorge.boullosa/DNA-786-wu-precipitation-graph-alert-move-styles

 */
app.use((err: any, req: Request, res: Response, next: Function) => {
  return res.status(err.status).send(`
    <h1>${err.message}<h1>
    <h2>${err.status}</h2>
    <pre>${err.stack}</pre>
  `);
});

export { app };