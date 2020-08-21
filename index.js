//This line imports Node's built in web server module
const express = require('express')
const app = express()
require('dotenv').config()
const Note = require('./models/note')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//this allows us to use the json-parser, which allows us to
// get data from the body property of the request object

/*
This uses the createServer method of the http module to create
a new web server. An event handler is registered to the server, which is called
every time an http request is made to the server's address

const app = http.createServer((request, response) => {
    //'application/json' let's the receiver know that the data is the JSON format
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })
*/

// the id is a parameter, so it needs the colon in front of it
app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes.map((note) => note.toJSON()))
	})
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	// this ensures that only the content we want is saved into the notes
	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	})

	note.save().then((savedNote) => {
		response.json(savedNote.toJSON())
	})
})

app.delete('/api/notes/:id', (request, response) => {
	Note.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		// eslint-disable-next-line no-undef
		.catch((error) => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note.toJSON())
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content: body.content,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote.toJSON())
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}
app.use(errorHandler)

/*
this part binds the http server assigned to the app variable, and to listen to
all http requests sent to the port 3001
*/
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
