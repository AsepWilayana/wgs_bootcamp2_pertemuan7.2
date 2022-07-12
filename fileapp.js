const readline = require("readline");
var validator = require("validator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const question_name = () => {
    return new Promise((resolve) => {
        rl.question("What's your name?", name => {
            if (name) {
                resolve(name);
            } else {
                resolve(question_name());
            }
        });
    });
};

const question_email = () => {
    return new Promise((resolve) => {
        rl.question("What's your email?", email => {
            validemail = validator.isEmail(email);
            if (validemail === true) {
                resolve(email);
            } else {
                resolve(question_email());
            }
        });
    });

};

const question_phone = () => {
    return new Promise((resolve) => {
        rl.question("What's your phone?", phone => {
            validphone = validator.isMobilePhone(phone, "id-ID");
            if (validphone === true) {
                resolve(phone);
            } else {
                resolve(question_phone());
            }
        });
    });

};

const askUser = async () => {
    const name = await question_name();
    const email = await question_email();
    const phone= await question_phone();
    console.log(`nama : ${name}`);
    console.log(`email : ${email}`);
    console.log(`phone : ${phone}`);
    rl.close();
};

askUser();