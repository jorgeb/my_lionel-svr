import { Request, Response } from 'express';

import dbProvider = require('../../db');


export class AuctionController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {

  }

  public all = () => {

    return this.db.auctions.all().then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });
    });
  };

  public items = () => {

    return this.db.auctionItems.allByAuctionId(this.req.params.id).then(data => {

      this.res.status(200).json({
        success: true,
        data:data
      });
    });

  };
}



/*
'use strict';

//var _ = require('lodash');
var Auction = require('./auction.model')(null);

module.exports = auctionController

function auctionController (opt) {
  // optional params
  opt = opt || {}

  var all = function(req, res, next){

    Auction.all().then(function (data) {

        return res.status(200).json(data);
      })
      .catch(function (error) {

        res.status(500);
        next(error);
      });
  };

  // API/data for end-user
  return {
    all: all
  };
}
*/


/*
// Get a single auction
exports.show = function(req, res) {
  Auction.findById(req.params.id, function (err, auction) {
    if(err) { return handleError(res, err); }
    if(!auction) { return res.status(404).send('Not Found'); }
    return res.json(auction);
  });
};
*/
/*
// Creates a new auction in the DB.
exports.create = function(req, res) {
  Auction.create(req.body, function(err, auction) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(auction);
  });
};

// Updates an existing auction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Auction.findById(req.params.id, function (err, auction) {
    if (err) { return handleError(res, err); }
    if(!auction) { return res.status(404).send('Not Found'); }
    var updated = _.merge(auction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(auction);
    });
  });
};

// Deletes a auction from the DB.
exports.destroy = function(req, res) {
  Auction.findById(req.params.id, function (err, auction) {
    if(err) { return handleError(res, err); }
    if(!auction) { return res.status(404).send('Not Found'); }
    auction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
*/
