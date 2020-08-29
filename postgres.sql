--CREATE A GALLERY DATABASE IF IT DOES NOT ALREADY EXIST
SELECT 'CREATE DATABASE sdc_gallery'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sdc_gallery')\gexec

\connect sdc_gallery

-- CREATE A TABLE FOR STORING USER DATA
CREATE TABLE user_info (
  user_id SERIAL NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  email VARCHAR(30) NOT NULL,
  date_of_birth: DATE NOT NULL,
  address VARCHAR(50)
  phone_number VARCHAR(8),
  PRIMARY KEY(user_id)
)

-- CREATE A TABLE FOR STORING DATA ABOUT A property A USER IS HOSTING
CREATE TABLE properties (
  property_id SERIAL NOT NULL,
  title VARCHAR(30) NOT NULL,
  rating SMALLINT,
  reviews_count SMALLINT,
  superhost BOOLEAN,
  loc VARCHAR(50) NOT NULL,
  user_id SERIAL NOT NULL,
  PRIMARY KEY(property_id)
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
      ON DELETE CASCADE
)

-- CREATE A TABLE FOR STORING GALLERY property IMAGES
CREATE TABLE images (
  img_id SERIAL NOT NULL,
  img_url VARCHAR(100) NOT NULL,
  upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
  img_description VARCHAR (255)
  property_id SERIAL,
  PRIMARY KEY(img_url),
      FOREIGN KEY(property_id) REFERENCES properties(property_id)
          ON DELETE CASCADE
);

--  CREATE A TABLE FOR STORING LIST DATA
CREATE TABLE saved_lists (
  list_id SERIAL NOT NULL,
  list_name VARCHAR(50) NOT NULL,
  proposed_start DATE DEFAULT NULL,
  proposed_end DATE DEFAULT NULL,
  property_count SMALLINT DEFAULT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id SERIAL NOT NULL
  property_id SERIAL NOT NULL
  PRIMARY KEY(list_id)
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);