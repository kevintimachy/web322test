const fs = require('fs');
var students = [];

exports.prep = function () {
    return new Promise((resolve, reject) =>
    {
        fs.readFile("./students.json", (err, data) => {
            if (err) {
                reject("unable to read file");
            }
            else{
                resolve();
                students = JSON.parse(data);
            }
        });
    });
}

exports.cpa = function () {
    return new Promise((resolve, reject) =>
    {
        var cpaStudents = students.filter(stud => stud.program == "CPA");
        if (cpaStudents.length == 0)
            reject("no results returned");
        else if (cpaStudents.length > 0)
            resolve(cpaStudents);
    });
}

exports.highGPA = function () {
    let bestStudent = students[0];
    for (let index = 0; index < students.length; index++) {
        if (students[index].gpa > bestStudent.gpa) {
            bestStudent = students[index];
        }
    }
    return new Promise((resolve, reject) =>
    {
        if (bestStudent)
            resolve(bestStudent);
        else
            reject("Failed finding the student with the highest GPA");
    });
}

exports.allStudents = function ()
{
    return new Promise((resolve, reject) =>
    {
        if (students.length == 0)
            reject("no results returned");
        else if (students.length > 0)
            resolve(students);
    });
}

exports.addStudent = function (studentData)
{
    studentData.studId = parseInt(studentData.studId);
    studentData.gpa = parseFloat(studentData.gpa);
    studentData.studId = students.length + 1;
    return new Promise((resolve, reject) => {
        if (studentData) {
            students.push(studentData);
            resolve();
        }
        else
            reject();
        
    });
}

exports.getStudent = function (studId)
{
    var student = students.find(stud => stud.studId == parseInt(studId));
    return new Promise((resolve, reject) => {
        if (student == undefined) {
            reject();
        }
        else
            resolve(student);
    });
    
}