const {Users,ValidateUser} = require('../models/user');
const router = require('express').Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');


router.post('/register', async(req,res)=>{
    const {error} = ValidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already exists");

    user = new Users(lodash.pick(req.body, ["name","email","password","profilePicture"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    
    await user.save();

    res.send(lodash.pick(user,["_id","name","email"]));

});


module.exports = router;
