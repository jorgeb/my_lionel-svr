"use strict";
var express_1 = require('express');
var image_auction_controller_1 = require('./image_auction.controller');
var imageAuctionRouter = express_1.Router();
exports.imageAuctionRouter = imageAuctionRouter;
imageAuctionRouter.get('/square/:auctionItemId/:width', function (req, res, next) {
    var iac = new image_auction_controller_1.ImageAuctionController(req, res, next);
    return iac.findSquare();
});
imageAuctionRouter.get('/:auctionItemId/:width/:height', function (req, res, next) {
    var iac = new image_auction_controller_1.ImageAuctionController(req, res, next);
    return iac.find();
});
//# sourceMappingURL=image_auction.route.js.map