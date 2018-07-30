const express = require("express");
const layout = require("./views/layout");
const {db} = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


const app = express();



app.use(express.static(__dirname + "./stylesheets"))
app.use(express.static('stylesheets'));


app.use('/wiki', wikiRouter);
app.use('/users',userRouter);

app.get('/', (req, res, next)=>{
    res.redirect('/wiki')
})

db.authenticate().then (()=>{
    console.log('connected to the database');
})




module.exports = app;

