const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static register method
userSchema.statics.register = async function (name, email, password) {

    // validator
    if(!name || !email || !password) {
        throw new Error("All field must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email not valid")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Pasword is not strong enough");
        
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hash })

    return user
}


// static login Method
userSchema.statics.login  = async function(email, password) {
    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)