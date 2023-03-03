const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const loginSchema = new mongoose.Schema({
    token: 
         String,
    
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const User = mongoose.model('User', userSchema)
const Login = mongoose.model('Login', loginSchema)

module.exports = {
    User, Login
}