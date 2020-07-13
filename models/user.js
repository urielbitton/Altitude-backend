const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const config = require('config');
const jwt = require('jsonwebtoken');
const projectSchema = require('./project').projectSchema;
const taskSchema = require('./task').taskSchema;

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    email: {
        type:String,
        required:true,
        unique:true,
        minlength:2,
        maxlength:255
    },
    password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    profilePicture: String,
    tasksAssigned:{
        type: [taskSchema],
        default : []
    },
    projects:{
        type: [projectSchema],
        default:[]
    }
});

userSchema.methods.genAuthToken = function(){
    return jwt.sign({email: this.email},config.get('jwtPrivateKey'));
}

const complexityOptions = {
    min:5,
    max:255,
    lowerCase:1,
    upperCase:1,
    numeric:1,
    symbol:0,
    requirementCount:0
};

const validateUser = (user) => {
    const newSchema = Joi.object({
        name: Joi.string().required().min(2).max(255),
        email: Joi.string().email().min(2).max(255).required(),
        password: passwordComplexity(complexityOptions),
        profilePicture: Joi.string()
    });

    return newSchema.validate(user);
}


const Users = mongoose.model('Users', userSchema);

module.exports.Users = Users;
module.exports.userSchema = userSchema;
module.exports.ValidateUser = validateUser;