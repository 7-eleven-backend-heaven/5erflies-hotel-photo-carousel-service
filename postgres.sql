--\i /Users/chris/SDC-photo-gallery/sdc-carousel-service/postgres.sql
-- note that the last data point cannot include a ,!
--CREATE A GALLERY DATABASE IF IT DOES NOT ALREADY EXIST
SELECT 'CREATE DATABASE sdc_gallery'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sdc_gallery')\gexec


-- =========================================================================================================================>
-- USERS

DROP TABLE IF EXISTS user_info;

-- CREATE A TABLE FOR STORING USER DATA
CREATE TABLE user_info (
  user_id INT NOT NULL,
  first_name VARCHAR(25),
  last_name VARCHAR (25),
  email VARCHAR(30) NOT NULL,
  date_of_birth DATE NOT NULL,
  street_address VARCHAR(50),
  city VARCHAR(20),
  state VARCHAR(20),
  zip SMALLINT,
  phone_number VARCHAR(14),
  PRIMARY KEY(user_id)
);

\COPY user_info FROM '/Users/chris/SDC-photo-gallery/sdc-carousel-service/users.csv' DELIMITER ',' CSV HEADER;

-- =========================================================================================================================>
-- PROPERTIES

DROP TABLE IF EXISTS properties;

-- CREATE A TABLE FOR STORING DATA ABOUT A PROPERTY HOSTED ON AIRBNB
CREATE TABLE properties (
  property_id INT NOT NULL,
  title VARCHAR(60) NOT NULL,
  bedrooms SMALLINT NOT NULL,
  beds SMALLINT NOT NULL,
  baths SMALLINT NOT NULL,
  guests SMALLINT NOT NULL,
  rating DECIMAL,
  reviews_count SMALLINT,
  superhost BOOLEAN,
  neighborhoods VARCHAR(50) NOT NULL,
  user_id_fk INT NOT NULL,
  PRIMARY KEY(property_id)
    -- FOREIGN KEY(user_id) REFERENCES user_info(user_id)
    --   ON DELETE CASCADE
);
\COPY properties FROM '/Users/chris/SDC-photo-gallery/sdc-carousel-service/properties.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE properties ADD CONSTRAINT properties_fk FOREIGN KEY (user_id_fk) REFERENCES user_info(user_id) ON DELETE CASCADE;


-- =========================================================================================================================>
-- IMAGES

DROP TABLE IF EXISTS images;

-- -- CREATE A TABLE FOR STORING PROPERTY IMAGES
CREATE TABLE images (
  img_id INT NOT NULL,
  img_url VARCHAR(75) NOT NULL,
  img_description VARCHAR (100),
  property_id_fk INT NOT NULL,
  PRIMARY KEY(img_id)
      -- FOREIGN KEY(property_id) REFERENCES properties(property_id)
      --     ON DELETE CASCADE
);

\COPY images FROM '/Users/chris/SDC-photo-gallery/sdc-carousel-service/images.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE images ADD CONSTRAINT images_fk FOREIGN KEY (property_id_fk) REFERENCES properties(property_id) ON DELETE CASCADE;

-- =========================================================================================================================>
-- SAVED LISTS

DROP TABLE IF EXISTS saved_lists;

--  CREATE A TABLE FOR STORING LIST DATA
CREATE TABLE saved_lists (
  list_id INT NOT NULL,
  list_name VARCHAR(50) NOT NULL,
  proposed_start DATE DEFAULT NULL,
  proposed_end DATE DEFAULT NULL,
  list_count SMALLINT DEFAULT NULL,
  user_id_fk INT NOT NULL,
  property_id_fk INT NOT NULL,
  PRIMARY KEY(list_id)
    -- FOREIGN KEY(user_id) REFERENCES user_info(user_id)
    -- FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

\COPY saved_lists FROM '/Users/chris/SDC-photo-gallery/sdc-carousel-service/lists.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE saved_lists ADD CONSTRAINT lists_users_fk FOREIGN KEY (user_id_fk) REFERENCES user_info(user_id) ON DELETE CASCADE;
ALTER TABLE saved_lists ADD CONSTRAINT lists_properties_fk FOREIGN KEY (property_id_fk ) REFERENCES properties(property_id) ON DELETE CASCADE;
