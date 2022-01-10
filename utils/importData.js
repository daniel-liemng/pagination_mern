require('dotenv').config();

const fs = require('fs');
const Post = require('../models/Post.js');
const connectDB = require('../config/db');

connectDB();

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, `utf-8`));

const importData = async () => {
  try {
    await Post.create(posts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Post.deleteMany({});

    console.log('Data deleted successfully!');
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};

// Which function is called: import or delete
// node utils/importData.js --import
// node utils/importData.js --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '-delete') {
  deleteData();
}
