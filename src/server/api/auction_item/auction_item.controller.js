"use strict";
var dbProvider = require('../../db');
var AuctionItemController = (function () {
    function AuctionItemController(req, res, next) {
        var _this = this;
        this.req = req;
        this.res = res;
        this.next = next;
        this.db = dbProvider.db;
        this.count = function () {
            return _this.db.auctionItems.count(_this.req.params.auctionId).then(function (count) {
                _this.res.status(200).json({
                    success: true,
                    data: count
                });
            });
        };
        this.pager = function () {
            return _this.db.auctionItems.pager(_this.req.params.auctionId, _this.req.params.limit, _this.req.params.offset).then(function (data) {
                _this.res.status(200).json({
                    success: true,
                    data: data
                });
            });
        };
        this.favorites = function () {
            return _this.db.auctionItems.findFavorites(_this.req.params.auctionId).then(function (data) {
                _this.res.status(200).json({
                    success: true,
                    data: data
                });
            });
        };
        this.save = function () {
            if (_this.req.body.auction_id)
                _this.req.body.auction_id = parseInt(_this.req.body.auction_id);
            return _this.db.auctionItems.save(_this.req.body).then(function (data) {
                _this.res.status(200).json({
                    success: true,
                    data: data
                });
            });
        };
        this.updateWatch = function () {
            console.log(_this.req.params);
            return _this.db.auctionItems.setWatch(_this.req.params.id, _this.req.params.watch).then(function (data) {
                _this.res.status(200).json({
                    success: true,
                    data: data
                });
            });
        };
    }
    return AuctionItemController;
}());
exports.AuctionItemController = AuctionItemController;
//# sourceMappingURL=auction_item.controller.js.map