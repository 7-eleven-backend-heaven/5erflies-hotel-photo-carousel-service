// import the Mongo Driver
const mongodb = require('mongodb');
const process = require('process');
const v8 = require('v8');

const MongoClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://localhost:27017';
const databaseName = 'sdc_galley';

let numberOfProperties = 2000;

MongoClient.connect(connectionUrl, (error, client) => {
  if (error) {
    console.log('Error occured while connecting to database:', error)
  } else {
    console.log('Successfully connected to MongoDb');
    const db = client.db(databaseName);
    seedMongoDB(db, numberOfProperties, () => { client.close(); })
  }
})

// const checkMemoryUsage = () => {
//   console.log('Memory usage:', process.memoryUsage())
// };

// const checkHeapStatistics = () => {
//   console.log('Heap Statistics:', v8.getHeapStatistics())
// };

const seedMongoDB = function (db, N, callback, timesCalled = 0) {
  const collection = db.collection('properties');
  // if we reached N, invoke callback
  if (timesCalled === N + 1) {
    callback();
  } else {
    let documents = [];
    // build the collection
    let i = 1 + (5000 * timesCalled);
    let limit = i + 5000;
    for (i; i < limit; i += 1) {
      const img_collection = createImagesArray(i);
      const document = createDocument(i, img_collection);
      documents.push(document);
    };
    // seed collection
    insertDocuments(collection, documents, timesCalled + 1);
    // invoke recursively
    setTimeout(() => { seedMongoDB(db, N, callback, timesCalled + 1) }, 0)
  }
};

const insertDocuments = (collection, documents, number) => {
  console.log(collection);
  collection.insertMany(documents, (error, docs) => {
    if (error) {
      // console.log(error);
      console.log(`Error inserting batch of documents ${number}`);
    } else {
      console.log('Data Succesfully Loaded into Database:', number);
    }
  });
};

const createImagesArray = (count) => {
  let img_collection = [];
  for (let j = 1; j <= `${images[count % images.length]}`; j += 1) {
    let image = {
      // changed i to j...
      url: `https://sdc-image-gallery-images.s3-us-west-2.amazonaws.com/image${num_imgs[j % num_imgs.length]}.jpg`,
      description: `${descriptions[count % descriptions.length]}`
    }
    img_collection.push(image);
  }
  return img_collection;
}

const createDocument = (count, images) => {
  let document = {
    ID: count,
    listingTitle: `${adjectives[count % adjectives.length]} ${property[count % property.length]} ${amenities[count % amenities.length]}`,
    rating: `${rating[count % rating.length]}`,
    numOfReviews: `${reviews[count % reviews.length]}`,
    superHost: `${superhost[i % 2]}`,
    location: `${neighborhoods[count % neighborhoods.length]}`,
    photos: images
  };
  return document;
}

const adjectives = [
  'Stunning',
  'Modern',
  'Beautiful',
  'Charming',
  'Quaint',
  'Delightful',
  'Private',
  'Secluded',
  'Lovely'
];
const property = [
  'Home',
  'Apartment',
  'Condo',
  'Unit',
  'Loft',
  'Townhouse'
];
const amenities = [
  'in Walking Distance to Broadway',
  'with Views of the East River',
  'with Views of the Hudson',
  'Centrally Located in Midtown',
  'with Great Access to Restaurants',
  'Set back in a quite alley',
  'with Views of the City',
  'Thats Pet Friendly',
  'One Block Away from Central Park',
  'One Block from the West Side drive',
  'Near a Bike Path for an Easy Commute',
  'with a Stunning View of the City',
];
const rating = [
  1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
  2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
  3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
  3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
  5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
  5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
];
const reviews = [];
for (var i = 1; i <= 100; i++) {
  reviews.push(i);
};
const superhost = [true, false];
const neighborhoods = [
  'Manhattan',
  "New York",
  'Long Island City',
  'Brooklyn',
  'Bushwick',
  'Queens',
  'Astoria',
  'Williamsburg',
  'Gowanus',
  'Park Slope',
  'Green Point',
  'Upper East Side',
  'Upper West Side',
  'Chelsea',
  'East Harlem',
  'Harlem',
  'Greenwich Village',
  'Tribeca',
];
const images = [];
for (let k = 10; k <= 25; k++) {
  images.push(k);
}
const num_imgs = [];
for (let l = 1; l <= 916; l++) {
  num_imgs.push(l);
}
const descriptions = [
  'Full size bed with drawers on the window side. Sunny and clean.',
  "Comfortable bed! You'll have a great night sleep.",
  "High ceilings and plenty of sun shine!",
  "Tired after walking all day? Come and rest! The room is ready for you.",
  "Fully stock bathroom!",
  "Clean sparkly private bathroom stocked with shampoo conditioner body wash soap and air refresher.",
  "Private Living room with Air Conditioner.",
  "Kitchenette with basic kitchen necessities and fridge.",
  "Your 2nd bedroom with our artwork and Queen size bed is super comfortable and cozy.",
  "You will enjoy the view of Manhattan from roof!",
  "Super Fast Wifi.",
  "Laundry room in the unit. You don't have to go to Laundromat like other New Yorkers!",
  "Large dining area!",
  "Master Living room with 3 big couches and futons. You will love to watch TV on this!",
  "Open Concept modern kitchen. Great Island;",
  "Beautiful Open Concept Great Room and Kitchen",
  "Sweet spot for a coffee and a chat",
  "Nice Sitting Area for a Book or Casual conversation",
  "Great Dining and Entertaining"
]