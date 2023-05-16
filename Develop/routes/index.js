const express=require('express');
const fs=require('fs');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
  

const app=express();

//get all notes
app.get('/notes',(req, res)=>{readFromFile('./db/db.json')
.then((data) => res.json(JSON.parse(data)));
});


//post a new note
app.post('/notes',(req, res)=>{
    console.log("POST recieved")
    const {title, text}=req.body 

    if(title && text){
        const note={
            title,
            text,
        }
        readAndAppend(note,'./db/db.json')
        res.json("New note added successfully")
    }else{
        res.json("Unable to add note")
    }
    
});

//delete note
app.delete('/notes', (req,res)=>{
    
})

    

   




module.exports=app;