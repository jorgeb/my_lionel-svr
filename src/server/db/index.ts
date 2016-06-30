// Bluebird is the best promise library available today, and is the one recommended here:
import * as promise from 'bluebird';

import users = require('./repos/users');
import products = require('./repos/products');
import auctioneers = require('./repos/auctioneers');
import auctionItems = require('./repos/auction_items');
import auctions = require('./repos/auctions');
import lionelItems = require('./repos/lionel_items');
import lionelTenders = require('./repos/lionel_tenders');

interface IExtensions {
    users:users.Repository,
    products:products.Repository,
    auctioneers:auctioneers.Repository,
    auctionItems:auctionItems.Repository,
    auctions:auctions.Repository,
    lionelItems:lionelItems.Repository,
    lionelTenders:lionelTenders.Repository
}

// pg-promise initialization options:
var options = {

    // Using a custom promise library, instead of the default ES6 Promise.
    // To make the custom promise protocol visible, you need to patch the
    // following file: node_modules/pg-promise/typescript/ext-promise.d.ts
    promiseLib: promise,

    // Extending the database protocol with our custom repositories:
    extend: obj => {
        obj.users = new users.Repository(obj);
        obj.products = new products.Repository(obj);
        obj.auctioneers = new auctioneers.Repository(obj);
        obj.auctionItems = new auctionItems.Repository(obj);
        obj.auctions = new auctions.Repository(obj);
        obj.lionelItems = new lionelItems.Repository(obj);
        obj.lionelTenders = new lionelTenders.Repository(obj);
    }
};

// Database connection parameters:
var config = {
    host: 'localhost',
    port: 5432,
    database: 'LV-Server',
    user: 'jorge',
    password:'luli0303'
};

// Loading and initializing pg-promise:
import * as pgPromise from 'pg-promise';
var pgp = pgPromise(options);

// Create the database instance with extensions:
var db = <pgPromise.IDatabase<IExtensions>&IExtensions>pgp(config);


// If you ever need to change the default pool size, here's an example:
// pgp.pg.defaults.poolSize = 20;

export = {

    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp,

    // Database instance. Only one instance per database is needed
    // within any application.
    db
};
