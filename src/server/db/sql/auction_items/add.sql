/*
    Inserts a new user record.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
INSERT INTO ${schema~}.auction_items(  auction_id,
                                       title,
                                       info,
                                       url,
                                       image_url,
                                       extra_images_url,
                                       to_watch,
                                       my_max_bid,
                                       end_bid,
                                       current_bid,
                                       current_max_bidder,
                                       my_wish,
                                       sort_order,
                                       external_id)
VALUES(${auction_id},
         ${title},
         ${info},
         ${url},
         ${image_url},
         ${extra_images_url},
         ${to_watch},
         ${my_max_bid},
         ${end_bid},
         ${current_bid},
         ${current_max_bidder},
         ${my_wish},
         ${sort_order},
         ${external_id})

returning *

