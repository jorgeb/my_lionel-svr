/*
    Inserts a new user record.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
INSERT INTO ${schema~}.auctioneers(name,info,active,url,item_url_pattern,auction_url_pattern)
VALUES(${name},${info},${active},${url},${item_url_pattern},${auction_url_pattern})
