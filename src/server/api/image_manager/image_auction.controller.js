"use strict";
var dbProvider = require('../../db');
var image_auction_util_1 = require('./image_auction-util');
var ImageAuctionController = (function () {
    function ImageAuctionController(req, res, next) {
        var _this = this;
        this.req = req;
        this.res = res;
        this.next = next;
        this.db = dbProvider.db;
        this.find = function () {
            var iau = new image_auction_util_1.ImageAuctionUtil();
            return iau.getImage(_this.req.params.auctionItemId, _this.req.params.width, _this.req.params.height).then(function (data) {
                _this.res.sendFile(data, { root: 'src/server/img/auctions' });
            });
        };
        this.findSquare = function () {
            var iau = new image_auction_util_1.ImageAuctionUtil();
            return iau.getSquareImage(_this.req.params.auctionItemId, _this.req.params.width).then(function (data) {
                _this.res.sendFile(data, { root: 'src/server/img/auctions' });
            });
        };
    }
    ;
    return ImageAuctionController;
}());
exports.ImageAuctionController = ImageAuctionController;
//# sourceMappingURL=image_auction.controller.js.map