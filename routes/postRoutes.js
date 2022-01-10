const { getAllPosts } = require('../controllers/postControllers');

const router = require('express').Router();

router.route('/').get(getAllPosts);

module.exports = router;
