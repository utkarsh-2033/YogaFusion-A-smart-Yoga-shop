const crypto = require('crypto');
const secureKey = crypto.randomBytes(64).toString('hex');
console.log('Your secure JWT secret key:', secureKey);
