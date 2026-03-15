const express = require('express');
const router = express.Router();
const {
  getArtworks,
  getArtworkById,
  deleteArtwork,
  updateArtwork,
  createArtwork,
} = require('../controllers/artworkController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getArtworks).post(protect, admin, createArtwork);
router
  .route('/:id')
  .get(getArtworkById)
  .delete(protect, admin, deleteArtwork)
  .put(protect, admin, updateArtwork);

module.exports = router;
