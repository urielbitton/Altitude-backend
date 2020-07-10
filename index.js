const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const projectRouter = require('./routes/projects');

const db = config.get('db');
const port = 4000 || process.env.PORT;
mongoose.connect(db,
    {useNewUrlParser: true, useCreateIndex: true,useFindAndModify:false, 
    useUnifiedTopology:true})
.then(() => console.log(`Connected to the database : ${db}`))
.catch((error)=> console.error(`Could not connect to the database due to : ${error}`));


app.listen(port,(req,res)=>{
    console.log(`Server started at port : ${port}`);
});


app.use(cors());
app.use(bodyParser.json());
app.use('/projects',projectRouter);


