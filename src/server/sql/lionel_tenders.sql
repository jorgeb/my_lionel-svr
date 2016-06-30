
-- Table: lionel_items

-- DROP TABLE lionel_items;

CREATE TABLE lionel_tenders
(
  id serial NOT NULL,
  lionel_id character varying NOT NULL,
  title character varying,
  link character varying,
  snippet character varying,
  htmlSnippet character varying,
  pagemap_cse_image_src character varying,
  liveauctioneers_images character varying,
  liveauctioneers_images_desc character varying,
  CONSTRAINT lionel_tenders_ix PRIMARY KEY (id)
  
)
WITH (
  OIDS=FALSE
);
ALTER TABLE lionel_tenders
  OWNER TO jorge;