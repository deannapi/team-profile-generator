const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const employees = [];

function startApp() {
    startHTML();
    addMember();
};

function addMember() {
    inquirer.prompt([{
        type: 'input', 
        name: 'name', 
        message: 'Enter team member\'s name.'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select the team member\'s role.',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'email', 
        message: 'Enter team member\'s email.'
    },
    {
        type:'input',
        name: 'id',
        message: 'Enter the team member\'s ID.'
    }
    ]).then(function({name, role, id, email}){
        let roleInfo = '';
        if(role === 'Engineer') {
            roleInfo = 'GitHub username';
        } else if (role === 'Intern') {
            roleInfo = 'School name';
        } else {
            roleInfo = 'Office phone number'
        }
        inquirer.prompt([{
            type: 'input',
            name: 'roleInfo',
            message: `Enter team member\'s ${roleInfo}`,
        },
        {
            type: 'list',
            name: 'otherMember',
            message: 'Do you need to add another team member?',
            choices: ['Yes', 'No']
        }
    ]).then(function ({roleInfo, otherMember}) {
        let newMember;
        if (role === 'Engineer') {
            newMember = new Engineer(name, id, email, roleInfo);
        } else if (role === 'Intern') {
            newMember = new Intern(name, id, email, roleInfo);
        } else {
            newMember = new Manager(name, id, email, roleInfo);
        }
        employees.push(newMember);
        addHTML(newMember)
        .then(function() {
            if (otherMember === 'Yes') {
                addMember();
            } else {
                finishHTML();
            }
        });
    });
    });
};

function startHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar mb-5" style='background-color: #fc0339;'>
            <span class="navbar-brand mb-0 h1 w-100 text-center" style='color:white; font-size:42px;'>🏢 Team Profile 🏢</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./index.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
};

function addHTML(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getID();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGitHub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header" style='text-align:center;background-color:#03fc9d'>${name}<br /><br />👨‍💻 Engineer 👩‍💻</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item" >📧 Email: <a href='mailto:${email}'>${email}</a></li>
                <li class="list-group-item">💻 GitHub: <a href='https://github.com/${gitHub}'>${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header" style='text-align:center;background-color:#03fc9d;'>${name}<br /><br />👨‍🎓 Intern 👩‍🎓</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item" >📧 Email: <a href='mailto:${email}'>${email}</a></li>
                <li class="list-group-item">🏫 School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header" style='text-align:center;background-color:#0324fc;color:white'>${name}<br /><br />👨‍💼 Manager 👩‍💼</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item" >📧 Email: <a href='mailto:${email}'>${email}</a></li>
                <li class="list-group-item">📞 Office Phone: <a href='tel:${officePhone}'>${officePhone}</a></li>
            </ul>
            </div>
        </div>`
        }
        console.log("Team Member's Added");
        fs.appendFile("./index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
};

function finishHTML() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("HTML Page Successfully Generated!");
};

startApp();