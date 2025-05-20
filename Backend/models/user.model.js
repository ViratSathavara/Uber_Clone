const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minLength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;