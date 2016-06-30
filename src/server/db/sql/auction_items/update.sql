/*
    Inserts a new user record.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
UPDATE ${schema~}.auction_items
SET
  title = ${title},
  info = ${info},
  url = ${url},
  image_url = ${image_url},
  extra_images_url = ${extra_images_url},
  to_watch = ${to_watch},
  my_max_bid = ${my_max_bid},
  end_bid = ${end_bid},
  current_bid = ${current_bid},
  current_max_bidder = ${current_max_bidder},
  my_wish = ${my_wish},
  sort_order = ${sort_order}
WHERE
  auction_id = ${auction_id}
AND
  external_id = ${external_id}

returning *