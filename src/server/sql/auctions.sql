
CREATE TABLE auctions
(
  id serial NOT NULL,
  auctioneer_id integer NOT NULL,
  name character varying,
  info character varying,
  auction_date date,
  external_id character varying
  CONSTRAINT "auctions_ix" PRIMARY KEY (id),
  CONSTRAINT "auctions_fk" FOREIGN KEY (auctioneer_id)
      REFERENCES auctioneers (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION

)
WITH (
  OIDS=FALSE
);
ALTER TABLE auctioneers
  OWNER TO jorge;
