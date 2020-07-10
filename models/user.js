const mongoose = require('mongoose');
const projectSchema = require('./project').projectSchema;
const taskSchema = require('./task').taskSchema;
const userSchema = new mongoose.Schema({
    name: String,
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


const Users = mongoose.model('Users', userSchema);

module.exports.Users = Users;
module.exports.userSchema = userSchema;