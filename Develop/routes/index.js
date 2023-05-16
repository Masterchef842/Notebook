const express=require('express');
const fs=require('fs');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
  

const app=express();

const getNextId= async()=>{
    let data= await readFromFile('./db/db.json');
    let parsedData=JSON.parse(data)
    if(parsedData[parsedData.length-1].id){
        
        return ((+ parsedData[parsedData.length-1].id)+1)
    }
        return 1;
    
}

//get all notes
app.get('/notes',(req, res)=>{readFromFile('./db/db.json')
.then((data) => res.json(JSON.parse(data)));
});


//post a new note
app.post('/notes',async (req, res)=>{
    console.log("POST recieved")
    const {title, text}=req.body 
    let nextId=await getNextId();
    if(title && text){
        
        const note={
            title,
            text,
            id: nextId
        }
        readAndAppend(note,'./db/db.json')
        res.json("New note added successfully")
    }else{
        res.json("Unable to add note")
    }
    
});

//delete note
app.delete('/notes/:id', (req,res)=>{
    let noteId=+req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) =>{
        const result=json.filter((note)=>note.id!==noteId)
        console.log(result);
        writeToFile('./db/db.json', result)
        res.json(`Item with id ${noteId} has been obliterated`)
    })
})

    






module.exports=app;