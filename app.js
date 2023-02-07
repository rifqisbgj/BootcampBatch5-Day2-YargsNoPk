// import modul external (yargs dan Validator) dan internal (fs atau filesystem)
const yargs = require('yargs');
const fs = require('fs');
const Validator = require('validator');

// check apakah ada folder data atau tidak
const folder = './data'
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder); // membuat folder sesuai dengan nilai folder
}
// end check folder

// check apakah ada file contacts.json dalam folder data
const filejson = './data/contacts.json'
if (!fs.existsSync(filejson)) {
    fs.writeFileSync(filejson, '[]', 'utf-8');
    // membuat file dengan lokasi sesuai var filejson dengan value []
    // value tersebut untuk menunjukkan bahwa file json tersebut berisi object yg tersimpan dalam array
}
// end check file

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
        // cek apakah user memasukkan email atau tidak
        let isEmailValid = Validator.isEmail(argv.email);
        if (argv.email) {
            if (!isEmailValid) { // kondisi jika validasi false
                argv.email = null // set null ke inputan email yang salah
                console.log("Format email salah (contoh: example@domain.com)");
                // memberikan informasi kepada user bahwa email salah dan informasi email yang benar
            }
        }
        // cek apakah user memasukkan nomor hp atau tidak
        let isMobilePhoneValid = Validator.isMobilePhone(argv.mobile, 'id-ID');
        if (argv.mobile) {
            if (!isMobilePhoneValid) { // jika validasi nombor handphone false
                argv.mobile = null // set null ke inputan mobile number yang salah
                console.log("Format nomor telpon salah (contoh: 08212345678)");
                // memberikan informasi kepada user bahwa nomor hp salah dan informasi nomor hp yang benar
            }
        }

        // variable contact berisi seluruh inputan yang diinput user dengan format JSON
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile
        }

        // membaca file contacts.json
        const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
        // membaca isi array dan merubah dalam bentuk array json
        const user = JSON.parse(rawData);

        // jika nomor hp dan nama tidak null
        // ini digunakan karna mobile yang salah akan diset null kembali
        // jika tidak menggunakan kondisi ini, pada file json akan muncul mobile: null
        if (isMobilePhoneValid && argv.name) {
            user.push(contact); // masukan ke array json
        }

        // kemudian data tersebut ke contacts.json
        fs.writeFileSync('./data/contacts.json', JSON.stringify(user));
    }
});
yargs.parse();