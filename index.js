//This line imports Node's built in web server module
const express = require('express')
const app = express()
const cors = require('cors')
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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// the id is a parameter, so it needs the colon in front of it
app.get('/api/notes/:id', (request, response) => {
  // the id given is a string, so we must convert it to an int
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })
  console.log(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  // to check that this is working, send a delete req through REST extension 
  // and make sure the status message is right
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    // the ... syntax turns the array of numbers into individual numbers
    ? Math.max(...notes.map(n => n.id))
    : 0

  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // this ensures that only the content we want is saved into the notes
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }


  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/* 
this part binds the http server assigned to the app variable, and to listen to 
all http requests sent to the port 3001
*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
