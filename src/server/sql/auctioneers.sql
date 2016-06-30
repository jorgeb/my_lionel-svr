
CREATE TABLE auctioneers
(
  id serial NOT NULL,
  name character varying,
  info character varying,
  active boolean,
  url character varying,
  item_url_pattern character varying,
  auction_url_pattern character varying,


  CONSTRAINT "auctioneers_ix" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE auctioneers
  OWNER TO jorge;
