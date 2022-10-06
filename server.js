const express = require("express");
const app = new express();
const path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
var data_prep = require("./data_prep.js");

var on_http = function(){
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/", (req, res)=>{
    let resText = `<h2>Declaration</h2><p>I acknowledge the College's academic intergrity policy - and my own intergrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I will not break that trust.</p><p>Name: <span style="background-color: yellow;">Kevin Timachy</span></p><p>Student Number: <span style="background-color: yellow;">145075180</span></p><p><a href="/CPA">Click to visit CPA Students</a></p><p><a href="/highGPA">Click to see who has the highest GPA</a></p>`;
    res.send(resText);
});

app.get("/CPA", (req, res) => {
    data_prep.cpa().then(result => { res.json(result); }).catch(err => { console.log(err); });
});  

app.get("/highGPA", (req, res) => {
    data_prep.highGPA().then(result => {
        data = JSON.stringify(result);
        let text = `<h2>Highest GPA:</h2><p>Student ID: ${JSON.stringify(result.studId)}</p><p>Name: ${result.name}</p><p>Program: ${result.program}</p><p>GPA: ${JSON.stringify(result.gpa)}</p>`;
        res.send(text);
    }).catch(err => { console.log(err); });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found!");
});
 

data_prep.prep().then(() => { app.listen(HTTP_PORT, on_http); }).catch((err) => { console.log(err); });