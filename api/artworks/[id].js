const dbConnect = require('../../lib/dbConnect');
const Artwork = require('../../lib/models/Artwork');
const { protect, isAdmin } = require('../../lib/authMiddleware');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const artwork = await Artwork.findById(id);
      if (artwork) {
        return res.status(200).json(artwork);
      } else {
        return res.status(404).json({ message: 'Artwork not found' });
      }
    }

    if (req.method === 'PUT') {
      const authorized = await protect(req, res);
      if (!authorized) return;
      if (!isAdmin(req, res)) return;

      const { title, description, medium, price, images, limitedEditionCount, isAvailable, dimensions } = req.body;

      const artwork = await Artwork.findById(id);

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
        return res.status(200).json(updatedArtwork);
      } else {
        return res.status(404).json({ message: 'Artwork not found' });
      }
    }

    if (req.method === 'DELETE') {
      const authorized = await protect(req, res);
      if (!authorized) return;
      if (!isAdmin(req, res)) return;

      const artwork = await Artwork.findById(id);

      if (artwork) {
        await artwork.deleteOne();
        return res.status(200).json({ message: 'Artwork removed' });
      } else {
        return res.status(404).json({ message: 'Artwork not found' });
      }
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
