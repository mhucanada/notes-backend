//This line imports Node's built in web server module
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
const { response } = require('express')

app.use(express.static('build'))
app.use(cors())
//this allows us to use the json-parser, which allows us to 
// get data from the body property of the request object
app.use(express.json())




let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
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
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  // to check that this is working, send a delete req through REST extension 
  // and make sure the status message is right
  response.status(204).end()
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // this ensures that only the content we want is saved into the notes
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })


  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/* 
this part binds the http server assigned to the app variable, and to listen to 
all http requests sent to the port 3001
*/
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
