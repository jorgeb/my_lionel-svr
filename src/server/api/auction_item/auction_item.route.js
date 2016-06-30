"use strict";
var express_1 = require('express');
var auction_item_controller_1 = require('./auction_item.controller');
var auctioneerItemRouter = express_1.Router();
exports.auctioneerItemRouter = auctioneerItemRouter;
auctioneerItemRouter.post('/', function (req, res, next) {
    var aic = new auction_item_controller_1.AuctionItemController(req, res, next);
    return aic.save();
});
auctioneerItemRouter.get('/:auctionId/count', function (req, res, next) {
    var aic = new auction_item_controller_1.AuctionItemController(req, res, next);
    return aic.count();
});
auctioneerItemRouter.get('/:auctionId/favorites', function (req, res, next) {
    var aic = new auction_item_controller_1.AuctionItemController(req, res, next);
    return aic.favorites();
});
auctioneerItemRouter.get('/:auctionId/pager/:limit/:offset', function (req, res, next) {
    var aic = new auction_item_controller_1.AuctionItemController(req, res, next);
    return aic.pager();
});
auctioneerItemRouter.get('/:id/setwatch/:watch', function (req, res, next) {
    var aic = new auction_item_controller_1.AuctionItemController(req, res, next);
    return aic.updateWatch();
});
//# sourceMappingURL=auction_item.route.js.map