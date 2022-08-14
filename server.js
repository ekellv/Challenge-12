// importing required node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// importing connection to db
const connection = require('./config/connection');

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
        .then((answers) => {
            const {choices} = answers;

            if (choices = "View All Departments") {
                viewDepts();
            }

            if (choices === "Add a Department") {
                addDepts();
            }

            if (choices === "View All Roles") {
                viewRoles();
            }

            if (choices === "Add a Role") {
                addRole();
            }

            if (choices === "View All Employees") {
                viewEmployees();
            }

            if (choices === "Add an Employee") {
                addEmployee();
            }

            if (choices === "Update an Employee Role") {
                updateEmpRole();
            }

            if (choices === "No Actions Necessary") {
                connection.end()
            };

        });
};
