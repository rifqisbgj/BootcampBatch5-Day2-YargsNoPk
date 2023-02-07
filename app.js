// import modul external (yargs) dan local (contacts)
const yargs = require('yargs');
const contacts = require('./handlerContact');

// cara menggunakan yargs: node namafile add --var="value"
// bikin flag dengan nama variabel 'name' dengan value 'ripki'

yargs.command({ // membuat command
    command: 'add', // dengan nama comand 'add'
    describe: 'add new contact', // deskripsi command
    builder: { // item yang ada di dalam command
        name: {
            describe: 'Contact Name',
            demandOption: true, // REQUIRED
            type: 'string'
        },
        email: {
            describe: 'Contact Email',
            demandOption: false, // OPTIONAL
            type: 'string'
        },
        mobile: {
            describe: 'Contact Mobile Phone Number',
            demandOption: true, // REQUIRED
            type: 'string'
        },
    },
    handler(argv) {
        contacts.saveContact(argv.name, argv.email, argv.mobile);
    }
});
yargs.parse();