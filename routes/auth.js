const {Users} = require('../models/user');
const router = require('express').Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');


router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");
    
    const token = user.genAuthToken();

    res.send(token);

});

const validate = (user) => {
    const newSchema = Joi.object({
        email: Joi.string().email().required().min(2).max(255),
        password: Joi.string().min(3).max(255)
    });

    return newSchema.validate(user);
}


module.exports = router;
