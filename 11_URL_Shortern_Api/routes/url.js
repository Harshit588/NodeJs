const express = require('express');
const { generateNewShortUrl, handleRedirect } = require('../controllers/url');
const router = express.Router();

router.post('/', generateNewShortUrl);
router.get('/:shortId', handleRedirect);

module.exports = router;
