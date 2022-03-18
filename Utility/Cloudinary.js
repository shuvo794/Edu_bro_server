require('dotenv').config();
require('dotenv').config();
const Cloudinary = require('Cloudinary ').v2;
Cloudinary.config({
    cloud_name: 'dhzqpxjwq',
    api_key: '926618324961222',
    api_secret: 'CO4lqMgeGbY97TPdEgIC0gSZ10w',
});

module.exports = { Cloudinary };


