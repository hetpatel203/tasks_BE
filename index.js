const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/', function(req,res){
    // res.send("welcomee..!!");
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files:files});//response render only when we have file
        // console.log(files);/ 
    })
})
app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        // res.render("file", {data:data});/
        res.render("show.ejs", {filename:req.params.filename, filedata});
    })
})

app.post('/create', function(req,res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
        res.redirect("/");
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})