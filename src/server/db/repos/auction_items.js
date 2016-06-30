"use strict";
var sqlProvider = require('../sql');
var sql = sqlProvider.auctionItems;
var Repository = (function () {
    function Repository(db) {
        var _this = this;
        this.empty = {
            auction_id: 0,
            title: null,
            info: null,
            url: null,
            image_url: null,
            extra_images_url: null,
            end_bid: null,
            current_bid: null,
            current_max_bidder: null,
            sort_order: 0,
            external_id: null
        };
        this.setToNull = function (prop) {
            var ret = prop;
            if (prop && (typeof prop === 'string') && (prop.length == 0)) {
                ret = null;
            }
            return ret;
        };
        this.save = function (values) {
            var toSave = Object.assign({}, _this.empty, values);
            return _this.findByExternalId(toSave.auction_id, toSave.external_id).then(function (auctionItem) {
                if (auctionItem.length > 0) {
                    toSave = Object.assign({}, auctionItem[0], toSave);
                    console.log('findByExternalId', toSave);
                    return _this.db.any(sql.update, toSave);
                }
                else {
                    return _this.db.one(sql.add, toSave);
                }
            });
        };
        this.count = function (AuctionId) {
            return _this.db.one("\n    SELECT\n      COUNT(*)\n    FROM\n      auction_items ai\n    WHERE ai.auction_id = $1\n    AND title IS NOT NULL", [AuctionId]);
        };
        this.pager = function (auctionId, limit, offset) {
            return _this.db.any("\n    SELECT\n      ai.*\n    FROM\n      auction_items ai\n    WHERE ai.auction_id = $1\n    AND title IS NOT NULL\n    ORDER BY lpad(external_id, 10, '0')\n    LIMIT $2 OFFSET $3", [auctionId, limit, offset]);
        };
        this.allByAuctionId = function (AuctionId) {
            return _this.db.any("\n    SELECT\n      ai.*, a.id auction_id, a.name auction_name, a.external_id auction_external_id, ats.name auctioneer_name\n    FROM\n      auction_items ai\n    INNER JOIN\n      auctions a ON a.id = ai.auction_id\n    INNER JOIN\n      auctioneers ats ON ats.id = a.auctioneer_id\n    WHERE a.id = $1\n    AND title IS NOT NULL", [AuctionId]);
        };
        this.findFavorites = function (auctionId) {
            return _this.db.any("SELECT * FROM auction_items WHERE auction_id = $1 AND to_watch = true ORDER BY lpad(external_id, 10, '0')", [auctionId]);
        };
        this.find = function (id) {
            return _this.db.oneOrNone("\n    SELECT\n      ai.*, a.id auction_id, a.name auction_name, a.external_id auction_external_id, ats.name auctioneer_name\n    FROM\n      auction_items ai\n    INNER JOIN\n      auctions a ON a.id = ai.auction_id\n    INNER JOIN\n      auctioneers ats ON ats.id = a.auctioneer_id\n    WHERE ai.id = $1", [id]);
        };
        this.setWatch = function (auctionId, toWatch) {
            return _this.db.any("UPDATE auction_items SET to_watch = $2 WHERE id = $1", [auctionId, toWatch]);
        };
        this.findByExternalId = function (auctionId, externalId) {
            return _this.db.any("SELECT * FROM auction_items WHERE auction_id = $1 AND external_id = $2", [auctionId, externalId]);
        };
        this.db = db;
    }
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=auction_items.js.map