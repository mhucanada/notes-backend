/* eslint-disable no-undef */

//this file handles all of the .env variables and exports it
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
	MONGODB_URI,
	PORT,
}
