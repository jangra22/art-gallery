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
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    limitedEditionCount: {
      type: Number,
      required: false,
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

// Prevent model recompilation in serverless environment
const Artwork = mongoose.models.Artwork || mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
