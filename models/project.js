const mongoose = require('mongoose');
const taskSchema = require('./task').taskSchema;
const userSchema = require('./user').userSchema;
const Joi = require('@hapi/joi');

const projectSchema = new mongoose.Schema({
    name: String,
    tasks: {
        type: [taskSchema],
        default: [],
    },
    teamMembers: {
        type: [userSchema],
        default: []
    },
    deadline: Date,
    dateOfCreation:{
        type:Date,
        default: Date.now
    }
});

const validateProject = (project) => {
    const newSchema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return newSchema.validate(project);
}



const Projects = mongoose.model('Projects',projectSchema);

module.exports.Projects = Projects;
module.exports.ValidateProject = validateProject;
module.exports.projectSchema = projectSchema;