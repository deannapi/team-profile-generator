const Employee = require('./Employee');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const Manager = require('./Manager');
const inquirer = require('inquirer');
const fs = require('fs');

class App{
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
        this.managerPromp = this.employeePrompt.concat = ([
            {
                type: 'input', 
                name: 'officePhone',
                message: 'What is your office phone number?'
            }
        ]);
        this.engineerPromp = this.employeePrompt.concat = ([
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
        })
    }
}

module.exports = App;