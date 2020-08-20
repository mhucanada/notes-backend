const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mhucanada:${password}@cluster0.zya80.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


// schema tells mongoose how the note objects are stored in the database
// the data stored in the DB is given a schema at the level of the application that defines the documents in any collection
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


/* const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
}) */

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

//this saves the note, and makes sure to close the connection through mongoose
/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */