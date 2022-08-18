
  
# Employee Tracker

## Description 

Employee Tracker is an app run in the command line to allow the user to simply and effectively view and edit a group of employees. 

![Github license](http://img.shields.io/badge/License-MIT-yellow.svg)

[A version of the deployed website can be viewed here.](https://github.com/ekellv/Employee-Tracker)

## Contents
1. [About](#about)
      1. [User Story](#user%20story)
      2. [Acceptance Criteria](#acceptance%20criteria)
      3. [Visuals](#visuals)
      4. [Technologies](#technologies)
2. [Installation](#installation)
3. [License](#license)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Testing](#testing)
7. [Authors and Acknowledgements](#authors%20and%20acknowledgements)

## About

A user can manage their company's user database by utilizing inquirer.js, node.js and MYSQL to gather information about their employees and then edit or add existing employees, departments and roles within their company. 

## User Story

```
AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company

SO THAT I can organize and plan my business
```

## Acceptance Criteria 

```
GIVEN a command-line application that accepts user input

WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, 
and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Visuals: 



## Technologies



## Installation 

Please run the following dependencies to install the application: 

`
npm i
`

## License 

This reposititory is licensed under the MIT license. 

For more information about this license or any others, please visit: [https://choosealicense.com/](https://choosealicense.com/).

## Usage 

After cloning and installing the repository, they can run `npm start` to begin the program. If they'd rather view the MYSQL database, they should run `mysql -u root -p`. 

## Contributing 

This repository is not currently accepting contributions. 

## Testing 

The command to run tests on this application is: 

`
No tests are currently installed. 
`

## Authors and Acknowledgements

Built by: Erin Voelker

## Contact Information

* GitHub: [ekellv](https://github.com/ekellv)
* Email: [erinkvoelker@gmail.com](mailto:erinkvoelker@gmail.com)

