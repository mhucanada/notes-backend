// the logger has 2 purposes, log messages, and error messages

const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params) => {
	console.error(...params)
}

module.exports = {
	info,
	error,
}
