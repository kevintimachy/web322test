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
        if (students.length == 0)
            reject("no results returned");
        else if (students.length > 0)
            resolve(students);
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