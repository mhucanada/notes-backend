const Note = require('../models/note')

const initialNotes = [
	{
		content: 'HTML is easy',
		date: new Date(),
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		date: new Date(),
		important: true,
	},
]

// creates an object ID that is not in the database
const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon', date: new Date() })
	await note.save()
	await note.remove()

	return note._id.toString()
}

// function that can be used to check the notes in the database
const notesInDb = async () => {
	const notes = await Note.find({})
	return notes.map((note) => note.toJSON())
}

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
}
