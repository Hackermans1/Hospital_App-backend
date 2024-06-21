//importing all the necessary modules that are required.
const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const news = require('../controllers/newsController')


//this will add the news to the news collection and it has jwt token check as we have to make it ensure that it is accessible by the admin only.
router.post('/newsentry',jwt.checkJwt,news.addNews)
//this will get all the news that is present in the database and it is not restricted because as it is called home page which can be accessible without login.
router.get('/latestnews',news.getNews)


//exporting the router object so that can be used in index.js file.
module.exports = router;