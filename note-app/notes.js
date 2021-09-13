const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else (
        console.log(chalk.red.inverse('Note title taken!'))
    )

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

      //another way(longer way)
    // const notesToKeep = notes.filter(function (note) {
    //     return note.title !== title
    // })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note Removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse("No Note found"));
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteRead = notes.find((note) => note.title === title)

    if (noteRead) {
        console.log(chalk.magenta.bold.underline.italic(noteRead.title))
        console.log(noteRead.body)
    } else {
        console.log(chalk.inverse.red('Error...! Note not found'))
    }
}


const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue('Your Notes'))
    const list = notes.forEach((note) => console.log(note.title));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}