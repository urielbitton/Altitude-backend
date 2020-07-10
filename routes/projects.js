const router = require('express').Router();
const Projects = require('../models/project').Projects;
const ValidateProject = require('../models/project').ValidateProject;

router.get('/', async(req,res)=>{
    const projects = await Projects.find();
    res.send({"projects":projects});
});

router.post('/',async(req,res)=>{
    const {error} = ValidateProject(req.body);
    if(error) res.status(400).send(error.details[0].message);
    
    else{
        const newProject = new Projects({name: req.body.name});
        await newProject.save();
        res.send("Project was added");
    }
})


module.exports = router;