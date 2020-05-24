const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

class App {
    constructor() {
        // Keep list of employees that are entered
        this.employees = [];

        this.employeePrompt = [{
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id', 
            message: 'What is your ID?'
        }, 
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        }
        ];
        this.managerPrompt = this.employeePrompt.concat = ([
            {
                type: 'input', 
                name: 'officePhone',
                message: 'What is your office phone number?'
            }
        ]);
        this.engineerPrompt = this.employeePrompt.concat = ([
            {
                type: 'input', 
                name: 'github',
                message: 'What is your GitHub username?'
            }
        ]);
        this.internPrompt = this.employeePrompt.concat= ([
            {
                type:'input', 
                name: 'school', 
                message: 'What is the name of your school?'
            }
        ]);
    }
    // start the next box of employee info
    start() {
        this.nextEmployee();
    }
    // end the questions and app
    end() {
        console.log('Team Profile Successfully Generated.');
    }

    // Keep asking user for next employee role and info until user selects "Exit" to end the application.  Then render the employee data on 
    // to HTML.
    nextEmployee() {
        this.promptRole().then((role) => {
            if (role ==='Exit') {
                this.renderHTML();
                this.end();
            }
            else {
                this.promptInfo(role).then((data) => {
                    switch (role) {
                        case "Manager":
                            this.employees.push(new Manager(data.name, data.id, data.email, data.officePhone));
                            break;
                        case "Engineer":
                            this.employees.push(new Engineer(data.name, data.id, data.email, data.officePhone));
                            break;
                            case "Intern":
                                this.employees.push(new Intern(data.name, data.id, data.email, data.officePhone));
                                break;
                    }
                    //Ask user to continue/end
                    this.nextEmployee();
                });
            }
        });
    }

    //Prompt user for employee role and return it
    promptRole() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What is your role?',
                choices: ['Manager', 'Engineer', 'Intern', 'Exit']
            }
        ]).then(function (data) {
            return (data.role);
        }).catch(function (error) {
            console.log(error);
        });
    }

    //Prompt user for employee Info and return it
    promptInfo(role) {
        switch(role) {
            case "Manager":
                return inquirer.prompt(this.managerPrompt).then(function (data) {
                    return data;
                });
            case "Engineer":
                return inquirer.prompt(this.engineerPrompt).then(function (data) {
                    return data;
                });
                case "Intern":
                    return inquirer.prompt(this.internPrompt).then(function (data) {
                        return data;
                    });
        }
    }
    // Add to HTML Template
    renderHTML() {
        fs.readFile('index.html', 'utf8', (err, htmlString) => {
            htmlString = htmlString.split("<script></script>").join(this.getScript());

            fs.writeFile('index.html', htmlString, (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;
                // success case, the file was saved
                console.log('HTML generated!');
        });
    });
    };

    getScript() {

        var scripts = ``;
        this.employees.forEach(e => {
            var field = "";
            var iconClass = "";
            switch (e.getRole()) {
                case "Manager":
                    field = `Office #: ${e.getOfficeNumber()}`;
                    iconClass = `users`;
                    break;
                case "Engineer":
                    field = `Github: ${e.getGithub()}`;
                    iconClass = `cogs`;
                    break;
                case "Intern":
                    field = `School: ${e.getSchool()}`;
                    iconClass = `user-graduate`;
                    break;
            }

            var cardScript = `
            <script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${e.getName()}");
            var header2 = $('<div class="card-header text-center">');
            var icon = $('<i class="fas fa-${iconClass}">');
            header2.text(" ${e.getRole()}");
            header2.prepend(icon);
            var cardBody = $('<div class="card-body text-info">');
            var cardTitle = $('<h5 class="card-title">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${e.getId()}");
            var cardText2 = $('<p class="card-text">');
            cardText2.text("Email: ${e.getEmail()}");
            var cardText3 = $('<p class="card-text">');
            cardText3.text("${field}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText3);
    
            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);    
            </script>        
            `;
            scripts += cardScript;

        });

        return scripts;
    }

};


const app = new App();

app.start();