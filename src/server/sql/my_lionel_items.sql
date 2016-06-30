
CREATE TABLE my_lionel_images
(
  id serial NOT NULL,
  my_lionel_items_id INTEGER NOT NULL,
  image_url character varying NOT NULL,
  CONSTRAINT my_lionel_images_ix PRIMARY KEY (id),
  CONSTRAINT my_lionel_items_fk FOREIGN KEY (my_lionel_items_id)
      REFERENCES my_lionel_items (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE my_lionel_images
  OWNER TO jorge;



CREATE TABLE my_boxes
(
  id serial NOT NULL,
  image_url character varying NOT NULL,
  qr character varying,
  CONSTRAINT my_boxes_ix PRIMARY KEY (id)
  
)
WITH (
  OIDS=FALSE
);
ALTER TABLE my_boxes
  OWNER TO jorge;

  
CREATE TABLE my_lionel_items
(
  id serial NOT NULL,
  lionel_id integer NOT NULL,
  box_id integer,
  updated date,
  CONSTRAINT my_lionel_items_ix PRIMARY KEY (id),
  CONSTRAINT my_lionel_items_fk FOREIGN KEY (lionel_id)
      REFERENCES lionel_items (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT my_lionel_items_fk_box FOREIGN KEY (box_id)
      REFERENCES my_boxes (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE my_lionel_items
  OWNER TO jorge;
