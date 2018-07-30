const express = require("express");
const models = require('./models')
const app = require ('./app');

const {db} = require('./models')
    db.authenticate().then (()=>{
        console.log('connected to the database');
    })

const init = async()=>{
    const PORT = process.env.PORT || 3000;
    await models.db.sync({force:true});
    app.listen(PORT, ()=>{
        console.log(`Server listening to port ${PORT}`)
    })
}


init();




