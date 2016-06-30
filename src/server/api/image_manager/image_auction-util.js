"use strict";
var request = require('request');
var fs = require('fs');
var path = require('path');
var gm = require('gm');
var imagic = gm.subClass({ imageMagick: true });
var dbProvider = require('../../db');
var ImageAuctionUtil = (function () {
    function ImageAuctionUtil() {
        var _this = this;
        this.db = dbProvider.db;
        this.getSquareImage = function (auctionItemId, width) {
            var origUrl = __dirname + "/../../img/auctions/" + auctionItemId + ".jpg";
            var url = __dirname + "/../../img/auctions/" + auctionItemId + "_" + width + "__.jpg";
            var file = path.basename(url);
            return new Promise(function (resolve, reject) {
                fs.exists(url, function (exists) {
                    if (exists) {
                        resolve(file);
                    }
                    else {
                        var bufWidth_1 = (width == 0) ? null : width;
                        fs.exists(origUrl, function (exists) {
                            if (exists) {
                                imagic(origUrl)
                                    .resize(bufWidth_1, bufWidth_1 + '^')
                                    .gravity('Center')
                                    .extent(bufWidth_1, bufWidth_1, null)
                                    .write(url, function (err) {
                                    resolve(file);
                                });
                            }
                            else {
                                _this.db.auctionItems.find(auctionItemId).then(function (auctionItem) {
                                    var stream = request(auctionItem.image_url);
                                    var writeStream = fs.createWriteStream(origUrl);
                                    stream.pipe(writeStream).on('finish', function () {
                                        imagic(origUrl)
                                            .resize(bufWidth_1, bufWidth_1 + '^')
                                            .gravity('Center')
                                            .extent(bufWidth_1, bufWidth_1, null)
                                            .write(url, function (err) {
                                            resolve(file);
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
            });
        };
        this.getImage = function (auctionItemId, width, height) {
            var origUrl = __dirname + "/../../img/auctions/" + auctionItemId + ".jpg";
            var url = __dirname + "/../../img/auctions/" + auctionItemId + "_" + width + "_" + height + ".jpg";
            var file = path.basename(url);
            return new Promise(function (resolve, reject) {
                fs.exists(url, function (exists) {
                    if (exists) {
                        resolve(file);
                    }
                    else {
                        var bufWidth_2 = (width == 0) ? null : width;
                        var bufHeight_1 = (height == 0) ? null : height;
                        fs.exists(origUrl, function (exists) {
                            if (exists) {
                                imagic(origUrl)
                                    .resize(bufWidth_2, bufHeight_1)
                                    .write(url, function (err) {
                                    resolve(file);
                                });
                            }
                            else {
                                _this.db.auctionItems.find(auctionItemId).then(function (auctionItem) {
                                    var stream = request(auctionItem.image_url);
                                    var writeStream = fs.createWriteStream(origUrl);
                                    stream.pipe(writeStream).on('finish', function () {
                                        imagic(origUrl)
                                            .resize(bufWidth_2, bufHeight_1)
                                            .write(url, function (err) {
                                            resolve(file);
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
            });
        };
    }
    return ImageAuctionUtil;
}());
exports.ImageAuctionUtil = ImageAuctionUtil;
//# sourceMappingURL=image_auction-util.js.map