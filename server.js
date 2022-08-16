// importing required node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// importing connection to db
const database = require('./config');


// display message after app connects
connectionMessage = () => { 
    console.log(" ____  _  _  ____  __     __  _  _  ____  ____")
    console.log("(  __)( \/ )(  _ \(  )   /  \( \/ )(  __)(  __)")
    console.log(" ) _) / \/ \ ) __// (_/\(  O ))  /  ) _)  ) _)")
    console.log("(____)\_)(_/(__)  \____/ \__/(__/  (____)(____)")
    console.log("  ____  ____   __    ___  __ _  ____  ____  ")    
    console.log(" (_  _)(  _ \ / _\  / __)(  / )(  __)(  _ \  ")   
    console.log("   )(   )   //    \( (__  )  (  ) _)  )   /  ") 
    console.log("  (__) (__\_)\_/\_/ \___)(__\_)(____)(__\_)  ") 
    
    userPrompts();
}

// begin inquirer prompts for user to choose from sift through
    
const userPrompts = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'Please choose from the following:',
            choices: [ 
                'View All Departments',
                'Add a Department',
                'View All Roles',
                'Add a Role',
                'View All Employees',
                'Add an Employee',
                'Update an Employee Role',
                'No Actions Necessary'
            ]
        }
    ])
    .then(function (answer) {
        switch (answer.action) {
            case "View All Departments":
                viewDepts();
                break;
            case "Add a Department":
                addDepts();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add a Role":
                addRole();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmpRole();
                break;
            case "No Actions Necessary":
                exit();
                break;
            default:
                break;
            };
        })
    };

// function to view all departments in the database

// viewDepts = () => {
//     const sql = 'SELECT * FROM department';
//     connection.query(query, function(err, res) {
//         if (err) throw err;
//         console.table('Viewing Departments: \n', res);

//     })
// }
