const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    dimensions: {
        type: String, // e.g. "24x36 inches"
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    limitedEditionCount: {
      type: Number,
      required: false, // if null, it's unique or open? Assuming unique if not specified or count=1
      default: 1
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
