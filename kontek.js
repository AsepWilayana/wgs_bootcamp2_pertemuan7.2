const fs = require ("fs")
var validator = require("validator");


//membuat folder data apabila tidak ada
function buatFolder() {
    const dirPath = './data';
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
}

// membuat file contact.json jika belum ada
function buatFile() {
    const dataPath = './data/contacts.json';
    if(!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath,'[]', 'utf-8')
    }
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf8');

    const contacts = JSON.parse(file);
    return contacts;
}

const save_context = (name, email, mobile) => {
    //data yg akan di masukan file contact
    const contact = {
        name, 
        email, 
        mobile
    };

    const contacts = loadContact();
    let findData = contacts.findIndex(item => item.name == name.toLowerCase());
    //console.log(findData)
    if(findData >= 0){
        console.log('nama sudah ada');
        return;
    }

    validemail = validator.isEmail(email);
        if (validemail === false) {
            console.log('format email salah');
            return;
        }
    
    validphone = validator.isMobilePhone(mobile, "id-ID");
        if (validphone === false) {
            console.log('phone number salah');
            return;
        }
    //tambhakan ke file
    contacts.push(contact);

    fs. writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('terimakasih sudah memasukkan data');
    console.log(contacts);
};

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List :');
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.mobile}`);
    });
};

const listDetail = (name) => {
    const contacts = loadContact();
    const findData = contacts.find(item => item.name == name);
    console.log(findData);
    console.log('Contact List :');
   
    console.log(`nama : ${findData.name}`);
    console.log(`email : ${findData.email}`);
    console.log(`mobile : ${findData.mobile}`);
};

const Deletedata = (name) => {
    const contacts = loadContact();
    const findData = contacts.find(item => item.name == name.toLowerCase());

    if (findData !== undefined){
        const deletedData = contacts.filter(item => item.name !== name.toLowerCase());
        
        fs. writeFileSync('data/contacts.json',JSON.stringify(deletedData));
        console.log(findData);

    }else{
        console.log('data tidak ada');
        return;
    }

};


const Updatedata = (name, newname, newemail, newmobile) => {
    const contacts = loadContact();
    const findData = contacts.find(item => item.name == name.toLowerCase());
    if (findData !== undefined){
        //dihapus dulu data yg sudah ketemmu
        const updateData = contacts.filter(item => item.name !== name.toLowerCase());
        
        // buat objek baru
        const contact = {
            name : newname || findData.name, 
            email : newemail || findData.email, 
            mobile : newmobile || findData.mobile
        };

        updateData.push(contact);
        
        fs. writeFileSync('data/contacts.json',JSON.stringify(updateData));
        console.log(updateData);
        // console.log('ada');
    }else{
        console.log('data tidak ada');
        return;
    }

};



module.exports = {buatFile, buatFolder, save_context, listContact, listDetail, Deletedata, Updatedata}