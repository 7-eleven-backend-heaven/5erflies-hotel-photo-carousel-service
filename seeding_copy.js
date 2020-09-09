const fs = require('fs');
const path = require('path');
const process = require('process');
const v8 = require('v8');

const checkMemoryUsage = () => {
  console.log('Memory usage:', process.memoryUsage())
};

const checkHeapStatistics = () => {
  console.log('Heap Statistics:', v8.getHeapStatistics())
};

//=======================================================================================================================================================================================>
// USERS TABLE

// 50
const firstNames = ['Chris', 'Susan', 'Jusheen', 'Tony', 'Jorge', 'Maureen', 'Chonghang', 'Nim', 'Tong', 'Blance', 'Reed', 'Tom', 'Michael', 'Junlin', 'Minji', 'Brian', 'Ciel', 'Yui', 'Alex', 'Rob', 'Maia', 'Jae', 'Eugene', 'Mylani', 'Destiny', 'Jaycie', 'Jared', 'Carrie', 'Jon', 'Watson', 'Harrison', 'Rebecca', 'Kim', 'Kylie', 'Scott', 'Lee', 'Christina', 'Dan', 'Stefan', 'Niel', 'Marc', 'Kamala', 'Jack', 'Ana', 'John', 'David', 'Michael', 'Dustin', 'Mike', 'Tom'];
// 40
const lastNames = ['Bryant', 'Jordan', 'Johnson', 'Pippen', 'Ali', 'Musk', 'Ravinkant', 'Ferris', 'Ronaldo', 'Walker', 'Hemsworth', 'Hines', 'Jackson', 'Decker', 'Longbottom', 'Potter', 'Wommack', 'Mackie', 'Burke', 'Mckenzie', 'Ingram', 'Arnett', 'Biden', 'Harris', 'Yang', 'Robbins', 'Collision', 'Ashfar', 'Brownlee', 'Mason', 'Evans', 'Caesar', 'Pollan', 'Ruth', 'Clark', 'Baker', 'Chapman', 'Boseman', 'Armstrong', 'Lee'];

const months = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

const days = Array.from(Array(31), (_, i) => i + 1);

const years = Array.from(Array(41), (_, i) => i + 1960);

const address = Array.from(Array(500), (_, i) => i + 100);
//33
const street = ['1st', '2nd', '3rd', '4th', '5th, 6th', '7th', '8th', '9th', '10th,', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st', '33nd', '33rd', '34th', '35th', '36th', '37th', '38th', '39th', '40th', '41st', '42nd', '43rd', '44th', '45th', '46th', '47th', '48th', '49th', '50th', '51st', '52nd', '53rd', '54th', '55th', '56th', '57th', '58th', '59th', 'Madison', 'Broadway', 'Park', 'Lexington', 'Amsterdam'];

const street2 = ['St.', 'Ave.'];

const cities = [
  "New York",
  'Long Island City',
  'Brooklyn',
  'Queens',
  'Harlem',
  'Bronx'
];
// 20
const zip = [10453, 11212, 100026, 10001, 10011, 10018, 10002, 10004, 10021, 10023, 11361, 11365, 11691, 11043, 10302, 10306, 10006, 10007, 10036, 11206];

const areaCodes = ['(631)', '(212)', '(646)', '(332)', '(516)'];

const phoneNumber = ['123-4567', '890-1234', '567-8901', '234-5678', '901-2345', '678-9012', '345-6789', '102-3456', '789-0123', '456-7890']

const writeUsers = fs.createWriteStream('./users.csv');
writeUsers.write(`user_id,first_name,last_name,email,date_of_birth,street_address,city,state,zip,phone_number\n`, 'utf8')
let start = new Date().getTime();
const writeNTimes = (writer, times, callback) => {
  // invokes the writeCSV file we define;
  writeCSV();
  // define the writeCSV function;
  function writeCSV() {
    // condition we set here; loop only executes when ok is true
    let ok = true;
    let i = 0;
    // the do-while statement creates a loop that executes a specified statement
    // until the test condition evaluates to false
    do {
      // statement that we execute until we break out of the do-while loop;
      // counts the number of loops performed
      times -= 1;
      // increments our index;
      i += 1;
      // define data that we write to stream;
      const data = `${i},${firstNames[i % 50]},${lastNames[i % 40]},${(firstNames[i % 50] + lastNames[i % 40]).toLowerCase()}@gmail.com,${months[i % 12] + '/' + days[i % 31] + '/' + years[i % 41]},${address[i % 58]}` + ' ' + `${street[i % 33]}` + ' ' + `${street2[i % 2]},${cities[i % 18]},New York,${zip[i % 2]},${areaCodes[i % 5] + '-' + phoneNumber[i % 10]}\n`;
      if (times === 0) {
        // code executed the last time; callback is passed at this step
        writer.write(data, 'utf-8', callback);
      } else {
        // for each iteration, ok is set to the value of stream.write()
        // ok will return false when a drain is required;
        ok = writer.write(data, 'utf-8')
      }
      // condition that must be met for statement to be exectued;
    } while (times > 0 && ok);
    // had sto stop early
    // write once more once buffer drains
    if (times > 0) {
      writer.once('drain', writeCSV)
    }
  }
}

writeNTimes(writeUsers, 10000000, () => {
  writeUsers.end();
  let end = new Date().getTime() - start;
  console.log('Elapased Miliseconds:', end)
  checkMemoryUsage();
  checkHeapStatistics()
});

// const writeUsersCSV = (records) => {
//   csvString = `user_id,first_name,last_name,email,date_of_birth,street_address,city,state,zip,phone_number\n`;
//   let start = new Date().getTime();
//   for (var i = 1; i < records; i++) {
//     csvString += `${i},`
//     csvString += `${firstNames[i % 50]},`
//     csvString += `${lastNames[i % 40]},`
//     csvString += `${(firstNames[i % 50] + lastNames[i % 40]).toLowerCase()}@gmail.com,`
//     csvString += `${months[i % 12] + '/' + days[i % 31] + '/' + years[i % 41]},`
//     csvString += `${address[i % 58]}` + ' ' + `${street[i % 33]}` + ' ' + `${street2[i % 2]},`
//     csvString += `${cities[i % 18]},`
//     csvString += `New York,`
//     csvString += `${zip[i % 2]},`
//     csvString += `${areaCodes[i % 5] + '-' + phoneNumber[i % 10]}`
//     csvString += `\n`
//   }

//   fs.writeFile(users, csvString, (error) => {
//     if (error) {
//       throw error
//     } else {
//       let end = new Date().getTime() - start;
//       console.log('Elapased Miliseconds:', end)
//       console.log('Data saved to File');
//       checkMemoryUsage();
//       checkHeapStatistics();
//     }
//   })
// }

// writeUsersCSV(1000000);

// //=======================================================================================================================================================================================>
// // PROPERTIES TABLE

// const properties = path.join(__dirname, 'properties.csv')
// // 9
// const adjectives = [
//   'Stunning',
//   'Modern',
//   'Beautiful',
//   'Charming',
//   'Quaint',
//   'Delightful',
//   'Private',
//   'Secluded',
//   'Lovely'
// ];
// // 5
// const property = [
//   'Home',
//   'Apartment',
//   'Condo',
//   'Unit',
//   'Loft',
//   'Townhouse'
// ];
// // 14
// const amenities = [
//   'in Walking Distance to Broadway',
//   'with Views of the East River',
//   'with Views of the Hudson',
//   'Centrally Located in Midtown',
//   'with Great Access to Restaurants Right Outside your Front Door',
//   'Set back in a quite alley',
//   'with Views of the City',
//   'Thats Pet Friendly',
//   'One Block Away from Central Park',
//   'One Block from the West Side drive',
//   'Near a Bike Path for an Easy Commute',
//   'with a Stunning View of the City',
// ];
// const rating = [
//   '',
//   1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
//   2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
//   3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
//   4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
//   5.0
// ];
// const reviews = Array.from(Array(100), (_, i) => i + 1);
// const superhost = [true, false];
// const neightborhoods = [
//   'Manhattan',
//   "New York",
//   'Long Island City',
//   'Brooklyn',
//   'Bushwick',
//   'Queens',
//   'Astoria',
//   'Williamsburg',
//   'Gowanus',
//   'Park Slope',
//   'Green Point',
//   'Upper East Side',
//   'Upper West Side',
//   'Chelsea',
//   'East Harlem',
//   'Harlem',
//   'Greenwich Village',
//   'Tribeca'
// ];
// const userId = Array.from(Array(100), (_, i) => i + 1);

// const writePropertiesCSV = (records) => {
//   let csvString = `property_id, title, rating, reviews_count, superhost, location, user_id\n`;
//   let start = new Date().getTime();
//   for (var i = 1; i < records; i++) {
//     csvString += `${i},`
//     csvString += `${adjectives[i % 9]} ${property[i % 6]} ${amenities[i % 14]},`
//     csvString += `${rating[i % 51]},`
//     csvString += `${reviews[i % 100]},`
//     csvString += `${superhost[i % 2]},`
//     csvString += `${neightborhoods[i % 18]},`
//     csvString += `${userId[i % 100]},`
//     csvString += `\n`
//   }

//   fs.writeFile(properties, csvString, (error) => {
//     if (error) {
//       throw error
//     } else {
//       let end = new Date().getTime() - start;
//       console.log('Elapased Miliseconds:', end)
//       console.log('Data saved to File');
//     }
//   })
// }

// writePropertiesCSV(20);
// // =======================================================================================================================================================================================>
// // IMAGES TABLE

// const images = path.join(__dirname, 'images.csv')
// // 16
// const descriptions = [
//   'Full size bed, drawers on the window side, sunny and clean.',
//   "Comfortable bed, you'll have a good night sleep.",
//   "High ceilings and plenty of sun shine but if you like the dark, the curtains can completely block the light.",
//   "Tired after walking all day, come and rest, It's ready for you.",
//   "Fully stock bathroom!",
//   "Clean sparkly private bathroom, stock with shampoo, conditioner, body wash soap and air refresher.",
//   "Private Living room with Air Conditioner.",
//   "Kitchenette with basic kitchen necessities and fridge.",
//   "Your 2nd bedroom with our artwork and Queen size bed is super comfortable and cozy.",
//   "You will enjoy the view of Manhattan from roof!",
//   "Super Fast Wifi.",
//   "Laundry room in the unit! You don't have to go to Laundromat like other New Yorkers.",
//   "Large dining area!",
//   "Master Living room with 3 big couches and futons. You will love to watch TV on this!",
//   "Open Concept modern kitchen. Great Island;",
//   "Beautiful Open Concept Great Room and Kitchen",
//   "Sweet spot for a coffee, drink and chat",
//   "Nice Sitting Area for a Book or Casual conversation",
//   "Great Dining and Entertaining"
// ]

// const num_imgs = Array.from(Array(916), (_, i) => i + 1);
// const writeImagesCSV = (records) => {
//   let csvString = `img_id, img_url, img_description\n`;
//   let start = new Date().getTime();
//   for (var i = 1; i < records; i++) {
//     csvString += `${i},`
//     csvString += `'https://sdc-image-gallery-images.s3-us-west-2.amazonaws.com/image${num_imgs % 916}.jpg}',`
//     csvString += `${descriptions[i % 16]}`
//     //Note - current date SHOULD be automatically popualted into table TODO - chekc if its not.
//     csvString += `\n`
//   }

//   fs.writeFile(images, csvString, (error) => {
//     if (error) {
//       throw error
//     } else {
//       let end = new Date().getTime() - start;
//       console.log('Elapased Miliseconds:', end)
//       console.log('Data saved to File');
//     }
//   })
// }

// writeImagesCSV(20);

// //=======================================================================================================================================================================================>
// // LIST TABLE
// const lists = path.join(__dirname, 'lists.csv')

// const names = [
//   'Weekend in the City!',
//   'Summer Stay in BK',
//   'Thanksgiving Places to Stay',
//   'Upper East or Upper West?',
//   'What burrorw, what burrow?',
//   "Steppin' and Stayin' in Greenwich",
//   'Welcome to NY, its been waiting for you',
//   'Buswick Zombies Halloween',
//   'Brooklyn, we go hard',
//   'Should we stay here for Christmas?',
//   "Charmin' Chelsea",
//   'Places to stay for the NY Gala',
//   'Why not stay here?',
// ]

// const count = Array.from(Array(20), (_, i) => i + 1);

// const writeListsCSV = (records) => {
//   let csvString = `list_id, list_name, proposed_start, proposed_start, list_count, user_id, property_id\n`
//   let start = new Date().getTime();
//   for (var i = 1; i < records; i++) {
//     csvString += `${i},`
//     csvString += `${names[i % 13]},`
//     csvString += `${new Date()},`
//     csvString += `${new Date()},`
//     csvString += `${count[i % 20]},`
//     csvString += `${i}`
//     csvString += `\n`
//   }

//   fs.writeFile(lists, csvString, (error) => {
//     if (error) {
//       throw error
//     } else {
//       let end = new Date().getTime() - start;
//       console.log('Elapased Miliseconds:', end)
//       console.log('Data saved to File');
//     }
//   })
// }

// writeListsCSV(20);
