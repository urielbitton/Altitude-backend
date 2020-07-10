const mongoose = require('mongoose');
const userSchema = require('./user').userSchema;

const taskSchema = new mongoose.Schema({
    name:String,
    assignedTo: [userSchema],
    status: {
        type:Number,
        default:0
    },
    dueDate: Date,
    filesAttached: [String]
});

const Tasks = mongoose.model('Tasks',taskSchema);

module.exports.taskSchema = taskSchema;
module.exports.Tasks = Tasks;

