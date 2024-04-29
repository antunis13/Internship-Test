const express = require('express')
const router = express.Router()

const scrapeController = require('../controllers/scrape')

router.get('/scrape', scrapeController.get)

module.exports = router
