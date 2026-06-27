const Listing = require('../models/Listing.model')

exports.getListings = async (req, res) => {
  try {
    const { category, search } = req.query
    const filter = { isSold: false }
    if (category) filter.category = category
    if (search) filter.title = { $regex: search, $options: 'i' }
    const listings = await Listing.find(filter)
      .populate('seller', 'name email')
      .sort({ createdAt: -1 })
    res.json(listings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category, condition } = req.body
    const listing = await Listing.create({
      title, description, price, category, condition,
      image: req.file?.path || '',
      seller: req.user._id,
    })
    res.status(201).json(listing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return res.status(404).json({ message: 'Not found' })
    if (listing.seller.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' })
    await listing.deleteOne()
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}