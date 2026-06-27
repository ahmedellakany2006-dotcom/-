const https = require('https');
const fs = require('fs');
const path = require('path');

const books = {
  "bukhari.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442115160i/22758117.jpg",
  "muslim.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1435914619i/25838944.jpg",
  "lisan.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327918342i/10762118.jpg",
  "riyadh.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327931341i/6093836.jpg",
  "tafsir.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1392651478i/10762235.jpg",
  "raheeq.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1283307521i/6504933.jpg",
  "zad.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327921319i/10762193.jpg",
  "bidayah.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327930509i/10762100.jpg",
  "fath.jpg": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327930509i/10762130.jpg"
};

const dir = path.join(__dirname, 'public', 'images', 'books');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filename))
           .on('error', reject)
           .once('close', () => resolve(filename));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  for (const [key, url] of Object.entries(books)) {
    try {
      await download(url, path.join(dir, key));
      console.log(`Successfully downloaded ${key}`);
    } catch (e) {
      console.error(`Failed to download ${key}:`, e.message);
    }
  }
}

main();
