const express = require('express')
const router = express.Router()
const { getListings, createListing, deleteListing } = require('../controllers/listing.controller')
const protect = require('../middleware/auth.middleware')
const { upload } = require('../config/cloudinary')

router.get('/', getListings)
router.post('/', protect, upload.single('image'), createListing)
router.delete('/:id', protect, deleteListing)

module.exports = router