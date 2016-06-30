CREATE TABLE lionel_types
(
  id serial NOT NULL,
  name character varying,
  fav_type character varying,
  
  CONSTRAINT lionel_types_ix PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE lionel_types
  OWNER TO jorge;



-- Table: auctions

-- DROP TABLE auctions;

CREATE TABLE lionel_items
(
  id serial NOT NULL,
  lionel_id character varying NOT NULL,
  lionel_type_id integer NOT NULL,
  name character varying,
  info character varying,
  info_html character varying,
  updated date,
  url character varying,
  image_url character varying,
  ins_image_url character varying,
  fav_type character varying,
  
  CONSTRAINT lionel_items_ix PRIMARY KEY (id),
  CONSTRAINT lionel_items_fk FOREIGN KEY (lionel_type_id)
      REFERENCES lionel_types (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE lionel_items
  OWNER TO jorge;
