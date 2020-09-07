// const fs = require('fs');

// const reviews = [1, 10, 20, 20, 500]

const seedData = (entries) => {
  for (let i = 1; i < entries; i++) {
    console.log(`${i % 6}`)
    // let dataString = '';
    // dataString += `${i}\n`
    // dataString += `${reviews[i%6]}`
    // dataString += `\n`
  }
  return new Promise((resolve, reject) => {
    fs.writeFile('data2.txt', dataStr, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// seedData(10)
//   .then(() => {
//     console.log('success')
//   })
//   .catch(() => {
//     console.log('failed')
//   })