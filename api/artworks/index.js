const dbConnect = require('../lib/dbConnect');
const Artwork = require('../lib/models/Artwork');
const { protect, isAdmin } = require('../lib/authMiddleware');

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

  try {
    if (req.method === 'GET') {
      const artworks = await Artwork.find({});
      return res.status(200).json(artworks);
    }

    if (req.method === 'POST') {
      const authorized = await protect(req, res);
      if (!authorized) return;
      if (!isAdmin(req, res)) return;

      const { title, description, medium, price, images, limitedEditionCount, dimensions } = req.body;

      const artwork = new Artwork({
        title,
        description,
        medium,
        price,
        images,
        limitedEditionCount,
        dimensions,
        isAvailable: true,
      });

      const createdArtwork = await artwork.save();
      return res.status(201).json(createdArtwork);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
