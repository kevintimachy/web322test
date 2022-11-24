const Sequelize = require('sequelize');

var sequelize = new Sequelize('kywvqaem', 'kywvqaem', 'sDw5Y0OPcqfhfmJORWDNs5yEaVOnZ21l', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

var Student = sequelize.define('Student', {
    studId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT
});

exports.prep = function () {
    return new Promise((resolve, reject) =>
    {
        sequelize.sync()
            .then(() => resolve())
            .catch(() => reject("unable to sync the database"));
    });
}

exports.cpa = function () {
    return new Promise((resolve, reject) =>
    {
        Student.findAll({
            where: {
                program: "CPA"
            }
        })
            .then((data)=> resolve(data))
            .catch(() => reject("no results returned"));
    });
}

exports.highGPA = function () {
    return new Promise((resolve, reject) =>
    {
        Student.findAll({})
            .then((students) => {
                let bestStudent = students[0];
                for (let index = 0; index < students.length; index++) {
                    if (students[index].gpa > bestStudent.gpa) {
                        bestStudent = students[index];
                    }
                }
                resolve(bestStudent);
            })
            .catch(() => reject("no results returned"));
    });
}

exports.allStudents = function ()
{
    return new Promise((resolve, reject) =>
    {
        Student.findAll({})
            .then((data) => resolve(data))
            .catch(() => reject("no results returned"));
    });
}

exports.addStudent = function (studentData)
{
    return new Promise((resolve, reject) => {
        for (const key in studentData) {
            if (studentData[key]== '') {
                studentData[key] = null;
            }
        }
        Student.create(studentData)
            .then(() => resolve())
            .catch(() => reject("unable to add the student"));
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