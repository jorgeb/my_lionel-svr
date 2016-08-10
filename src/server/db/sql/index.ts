import {QueryFile} from 'pg-promise';

// Helper for linking to external query files;
function sql(file) {

  var path = __dirname + '/' + file;

  var options = {

// minifying the SQL is always advised;
// see also option 'compress' in the API;
    minify: true,

    params: {
// Showing how to use static pre-formatting parameters -
// variable 'schema' in each SQL, just as an example;

      schema: 'public' // 'public' is the default schema
    }
  };

  return new QueryFile(path, options);

// See QueryFile API:
// http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query and its formatting parameters. However, this is
// very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

// We import only a few queries here, while using the rest in-line in the code, only to provide a
// diverse example here, but you may just as well put all of your queries into SQL files.

export = {
    lionelItems:{
    add: sql('lionel_items/add.sql'),
    update: sql('lionel_items/update.sql')
  },
  lionelTenders:{
    add: sql('lionel_tenders/add.sql'),
    addExtendedTender: sql('lionel_steam_tenders/add_my_extended_tender.sql'),
    updateExtendedTender: sql('lionel_steam_tenders/update_my_extended_tender.sql'),
    addAssoc: sql('lionel_steam_tenders/add_assoc.sql'),
    
  },
  lionelTenderImages:{
    addImage: sql('lionel_steam_tenders/add_image.sql')
  },
  auctionItems:{
    add: sql('auction_items/add.sql'),
    update: sql('auction_items/update.sql')
  },
  auctioneers:{
    add: sql('auctioneers/add.sql'),
    all: sql('auctioneers/all.sql'),
    delete: sql('auctioneers/delete.sql'),
  },
  users: {
    create: sql('users/create.sql'),
    empty: sql('users/empty.sql'),
    init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql')
  },
  products: {
    create: sql('products/create.sql'),
    empty: sql('products/empty.sql'),
    drop: sql('products/drop.sql'),
    add: sql('products/add.sql')
  },
  my_boxes: {
    update: sql('my_lionel/update_box.sql'),
    add: sql('my_lionel/add_box.sql')
  },
  my_lionel_items: {
    update: sql('my_lionel/update_item.sql'),
    add: sql('my_lionel/add_item.sql')
  }

};
