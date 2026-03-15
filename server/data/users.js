const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // Will be hashed by model pre-save hook? No, insertMany doesn't trigger pre-save hooks usually!
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

// We need to hash passwords manually if using insertMany, or use create/loop
// But wait, the seeder I wrote uses insertMany. 
// Mongoose's insertMany DOES NOT trigger pre('save') hooks.
// So I should pre-hash them here or change seeder to use create().

// Converting to use pre-hashed for simplicity in this file isn't easy without async/await at top level (commonjs).
// Let's modify seeder.js to loop and using create() instead.

module.exports = users;
