
let property_Schema = new Schema {
  property_id: Number
  title: String
  bedrooms: Number
  beds: Number
  baths: Number
  guests: Number
  rating: Number
  review_count: Number
  location: String
  images: [
    { img_id: Number, img_url: String, upload_date: Date, img_description: String }
  ]
};
