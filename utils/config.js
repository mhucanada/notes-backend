/* eslint-disable no-undef */

//this file handles all of the .env variables and exports it
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT,
}
