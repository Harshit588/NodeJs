const express = require('express');
const { generateNewShortUrl, handleRedirect, getAllUrlsWithVisits } = require('../controllers/url');
const router = express.Router();


router.post('/', generateNewShortUrl);
router.get('/:shortId', handleRedirect);
router.get('/',getAllUrlsWithVisits)

module.exports = router;
