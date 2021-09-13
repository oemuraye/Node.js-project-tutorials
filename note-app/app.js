const chalk = require('chalk')
const { describe, parse } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')


//customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        } 
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
    command: 'list',
    describe: 'Creating a list',
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'read me',
    builder: {
        title: {
           describe: "Note title",
           demandOption: true,
           type: "string",
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse()
