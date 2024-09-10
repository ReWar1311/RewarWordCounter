import dotenv from "dotenv";
import { countCharacters, countWords } from 'gmx-word-counter';
import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var dirname= __dirname+"/public/main.css";


dotenv.config();
const app= express();
const port=process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post("/submit",(req,res)=>{
    console.log(req.body);
    const data = req.body.para;
    const language = req.body.lang;
    const words = countWords( data, language);
    const characterCount = countCharacters(data);
    res.render("index",{
        words, characterCount,dirname
    });
    console.log(characterCount)

});

app.get("/",(req,res)=>{
    res.render("index",{dirname});
})

app.listen(port,()=>{
    console.log("running on port "+port)
})

