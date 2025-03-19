const dotenv = require('dotenv');
dotenv.config();
const config = {
    env:process.env['JWT_SECRET']
}

module.exports = config;