const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        this.github = github;
        super(name, id, email);
        super.role = 'Engineer';
    }

    getGitHub() {
        return this.github;
    }
}

module.exports = Engineer;