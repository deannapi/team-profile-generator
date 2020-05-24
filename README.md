# :office:Team Profile Generator
Node.js builds a HTML page to display summaries about employees.

![GitHub followers](https://img.shields.io/github/followers/deannapi?style=social)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/deannapi/team-profile-generator)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/deannapi/team-profile-generator)
![GitHub](https://img.shields.io/github/license/deannapi/team-profile-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/deannapi/team-profile-generator)

## :bookmark_tabs:Table of Contents
* [Description](#description)
* [Demo](#demo)
* [Instructions](#instructions)

## :bulb:Description
        AS A manager
        I WANT to generate a webpage that displays my team's basic info
        SO THAT I have quick access to their emails and GitHub profiles.

        GIVEN a command-line application that accepts user input
        WHEN I am prompted for my team members and their information
        THEN an HTML file is generated that displays a nicely formatted team roster based on user input
        WHEN I click on an email address in the HTML
        THEN my default email program opens and populates the TO field of the email with the address
        WHEN I click on the GitHub username
        THEN that GitHub profile opens in a new tab
        WHEN I start the application
        THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
        WHEN I enter the team manager’s name, employee ID, email address, and office number
        THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
        WHEN I select the engineer option
        THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
        WHEN I select the intern option
        THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
        WHEN I decide to finish building my team
        THEN I exit the application, and the HTML is generated

## :bulb:Demo
![]()

## :pencil2:Instructions
The application uses [Jest](https://www.npmjs.com/package/jest) for running the unit tests and [Inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.  The application will be invoked by using the following command:

        node app.js
