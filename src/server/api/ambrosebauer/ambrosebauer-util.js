"use strict";
var request = require('request');
var cheerio = require('cheerio');
var dbProvider = require('../../db');
var AmbrosebauerUtil = (function () {
    function AmbrosebauerUtil() {
        var _this = this;
        this.db = dbProvider.db;
        this.parserSite = function (auctionId, from, to) {
            return _this.db.auctions.find(auctionId).then(function (auction) {
                if (auction.length > 0)
                    return _this.parse('', auction[0].external_id, from, to, auctionId);
                else
                    return null;
            });
        };
        this.parse = function (urlPattern, externalId, from, to, auctionId) {
            return Promise.resolve()
                .then(function () {
                var ret = [];
                for (var i = from; i <= to; i++) {
                    var url = "http://ambrosebauer.com/lotdetail.php?auction=" + externalId + "&lot=" + i;
                    _this.loadUrl(url, i).then(function (data) {
                        var defAI = Object.assign({}, { auction_id: auctionId, external_id: data.auExternalId.toString() }, _this.pasrseHtml(data.body));
                        _this.db.auctionItems.save(defAI);
                    });
                    ret.push(i);
                }
                return ret;
            });
        };
        this.pasrseHtml = function (html) {
            var $ = cheerio.load(html);
            var ret = { image_url: '',
                extra_images_url: null,
                title: null,
                info: null,
                current_bid: null,
                current_max_bidder: null };
            $('img[width="500"]').filter(function () {
                var data = $(this);
                if (data.attr('src'))
                    ret.image_url = 'http://ambrosebauer.com' + data.attr('src');
            });
            ret.extra_images_url = $('img[height="170"]').map(function (i, el) {
                return 'http://ambrosebauer.com' + $(this).attr('src');
            }).get()
                .filter(function (url) {
                return (url.indexOf('/grey.gif') === -1);
            }).join();
            $('table[width="500"] p font[color="#400000"]').filter(function () {
                var data = $(this);
                ret.title = data.text();
            });
            $('table[width="500"] font p[align="justify"]').filter(function () {
                var data = $(this);
                ret.info = (data.text()).trim();
            });
            $('form[action="/lotdetail.php"] td[width="91"]').filter(function () {
                var data = $(this);
                ret.current_bid = data.text().replace('$', '');
                ret.current_max_bidder = (data.next().text()).trim();
            });
            return ret;
        };
    }
    AmbrosebauerUtil.prototype.loadUrl = function (url, auExternalId) {
        return new Promise(function (resolve, reject) {
            var extServerOptions = {
                host: 'ambrosebauer.com',
                port: '80',
                path: url,
                method: 'GET'
            };
            request({ uri: url }, function (err, message, body) {
                if (!err) {
                    if (message.statusCode < 400)
                        resolve({ body: body, auExternalId: auExternalId });
                }
                else {
                }
            });
        });
    };
    return AmbrosebauerUtil;
}());
exports.AmbrosebauerUtil = AmbrosebauerUtil;
//# sourceMappingURL=ambrosebauer-util.js.map