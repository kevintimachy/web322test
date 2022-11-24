//cyclic: 

const express = require("express");
const app = new express();
const path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
var data_prep = require("./data_prep.js");
const exphbs = require("express-handlebars");

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

var on_http = function(){
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/CPA", (req, res) => {
    data_prep.cpa().then(result => { res.render("students", { students: result });}).catch(err => { console.log(err); });
});  

app.get("/highGPA", (req, res) => {
    data_prep.highGPA().then(result => {
        res.render("student", { student: result });
    }).catch(err => { console.log(err); });
});

app.get("/allStudents", (req, res) => {
    data_prep.allStudents().then(result => { res.render("students", { students: result }); }).catch(err => { console.log(err); });
});  

app.get("/addStudent", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});  

app.post("/addStudent", (req, res) => {
    data_prep.addStudent(req.body).then(result => {
        res.render("student", {student: req.body})
    }).catch(err => res.json(err));
    
});

app.get("/student/:studId", (req, res) => {
    data_prep.getStudent(req.params.studId).then(result => { res.render("student", {student: result})
    }).catch(err => res.json({ message: "no result found" }));
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found!");
});
 

data_prep.prep().then(() => { app.listen(HTTP_PORT, on_http); }).catch((err) => { console.log(err); });