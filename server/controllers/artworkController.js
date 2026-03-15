const asyncHandler = require('express-async-handler');
const Artwork = require('../models/Artwork');

// @desc    Fetch all artworks
// @route   GET /api/artworks
// @access  Public
const getArtworks = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find({});
  res.json(artworks);
});

// @desc    Fetch single artwork
// @route   GET /api/artworks/:id
// @access  Public
const getArtworkById = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404);
    throw new Error('Artwork not found');
  }
});

// @desc    Delete an artwork
// @route   DELETE /api/artworks/:id
// @access  Private/Admin
const deleteArtwork = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (artwork) {
    await artwork.deleteOne();
    res.json({ message: 'Artwork removed' });
  } else {
    res.status(404);
    throw new Error('Artwork not found');
  }
});

// @desc    Create a new artwork
// @route   POST /api/artworks
// @access  Private/Admin
const createArtwork = asyncHandler(async (req, res) => {
  const { title, description, medium, price, images, limitedEditionCount, dimensions } = req.body;
  
  const artwork = new Artwork({
    title,
    description,
    medium,
    price,
    images,
    limitedEditionCount,
    dimensions,
    isAvailable: true
  });

  const createdArtwork = await artwork.save();
  res.status(201).json(createdArtwork);
});

// @desc    Update an artwork
// @route   PUT /api/artworks/:id
// @access  Private/Admin
const updateArtwork = asyncHandler(async (req, res) => {
  const { title, description, medium, price, images, limitedEditionCount, isAvailable, dimensions } = req.body;

  const artwork = await Artwork.findById(req.params.id);

  if (artwork) {
    artwork.title = title || artwork.title;
    artwork.description = description || artwork.description;
    artwork.medium = medium || artwork.medium;
    artwork.price = price || artwork.price;
    artwork.images = images || artwork.images;
    artwork.limitedEditionCount = limitedEditionCount || artwork.limitedEditionCount;
    artwork.dimensions = dimensions || artwork.dimensions;
    artwork.isAvailable = isAvailable !== undefined ? isAvailable : artwork.isAvailable;

    const updatedArtwork = await artwork.save();
    res.json(updatedArtwork);
  } else {
    res.status(404);
    throw new Error('Artwork not found');
  }
});

module.exports = {
  getArtworks,
  getArtworkById,
  deleteArtwork,
  createArtwork,
  updateArtwork,
};
