const express = require('express');
const router = express.Router();
const { summarizeFromFile, summarizeFromUrl, exportAsPdf } = require('../controllers/videoController');

// Updated routes to be more specific
router.post('/summarize-file', summarizeFromFile);
router.post('/summarize-url', summarizeFromUrl);
router.post('/export/pdf', exportAsPdf);

module.exports = router;
