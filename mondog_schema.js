const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user_Schema = new Schema {
  user_id: Number
  user_name: String
  email: String
  date_of_birth: Date
  address: String
  phone_number: String
  superhost: Boolean
  saved_lists: [saved_lists_Schema]
  property: [property_Schema]
}

let property_Schema = new Schema {
  property_id: Number
  title: String
  rating: Number
  review_count: Number
  location: String
  images: [imagesSchema]
};

let saved_lists_Schema = new Schema {
  list_id: NUMBER
  list_name: VARCHAR(50)
proposed_dates: DATE
list_count: SMALLINIT
date_created: DATE
}

var images_Schema = new Schema {
  img_id: Number
  img_url: String
  upload_date: Date
  img_description: String
};

let Listing = mongoose.model('Listing', propertySchema);