// importing required node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// importing connection to db
const database = require('./config');
const { viewDepts, addDepts, viewRoles, addRole } = require('./config');


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
            case'"View All Departments':
                viewDepts();
                break;
            case 'Add a Department':
                addDepts();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmpRole();
                break;
            case 'No Actions Necessary':
                exit();
                break;
            default:
                break;
            };
        })
    };

viewDepts = () => {
    database.viewDepts()
        .then(([rows]) => {
            let department = rows; 
            console.log('\n');
            console.table(department);
        })
        .then(() => userPrompts());
}

addDepts = () => {
    prompt([
        {
            name: 'name',
            message: 'Please type the name of the department you\'d like to add:'
        }
    ])
    .then(res => {
        let name = res;
        database.addDepts(name)
            .then(() => console.log(`${name.name} has been added to the department database.`))
            .then(() => userPrompts());
    })
}

viewRoles = () => {
    database.viewRoles()
        .then(([rows]) => {
            let role = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => userPrompts());
}

addRole = () => {
    database.viewDepts()
        .then(([rows]) => {
            let department = rows;
            const userDeptChoice = department.map(({ id, name }) =>({
                name: name,
                value: id
            }));

        prompt([
            {
                name: 'title',
                message: 'Please type the name of the role you\'d like to add:'
            },
            {
                name: 'salary',
                message: 'Please type the salary of the new role:'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'In which department is the new role?',
                choices: userDeptChoice
            }
        ])
            .then(role => {
                database.addRole(role)
                    .then(() => console.log(`${role.title} has been added to the role database.`))
                    .then(() => userPrompts())
            })
        })
}