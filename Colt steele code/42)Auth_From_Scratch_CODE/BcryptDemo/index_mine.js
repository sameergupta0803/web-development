const bcrypt = require('bcrypt')

// const generatePassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);//generates the salt for the password for security so that same passwords have unique hashing.The number defines the time taken for the salt to generate
//     const hash = await bcrypt.hash(pw, salt)//hashes the password along with the salt
//     console.log(salt)
//     console.log(hash)
// }
const generatePassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12)//hashes the password along with the salt number,no need to generate the salt seperately
    console.log(hash)
}
const validatePassword = async (pw, hashedpw) => {
    const result = await bcrypt.compare(pw, hashedpw)//compares and password with the hashed password to see if the values match or not.The salt is seperated by bcrypt on its own.Returns a boolean
    if (result) console.log("Logged in successfully")
    else console.log("Incorrect password")
}
// generatePassword('sameer')
validatePassword('sameer', '$2b$12$dMieBt2Hz3pd2uRsXgIMQuqen7wuhvkBdZLVceqv4ZIJxdVmNEi/6')