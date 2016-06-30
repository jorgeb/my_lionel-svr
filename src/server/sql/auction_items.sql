
CREATE TABLE auction_items
(
  id serial NOT NULL,
  auction_id integer NOT NULL,
  title character varying,
  info character varying,
  url character varying,
  image_url character varying,
  extra_images_url character varying,
  to_watch boolean,
  my_max_bid integer,
  end_bid integer,
  current_bid integer,
  current_max_bidder character varying,
  my_wish integer,
  sort_order integer,
  external_Id character varying,
  CONSTRAINT "auction_items_ix" PRIMARY KEY (id),
  CONSTRAINT "auction_items_fk" FOREIGN KEY (auction_id)
      REFERENCES auctions (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE auction_items
  OWNER TO jorge;
