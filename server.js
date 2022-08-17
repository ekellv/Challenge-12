// importing required node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// importing connection to db
const database = require('./config/index');

// const mysql = require('mysql2'); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olly123',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    connectionMessage();
});

// module.exports = connection; 
// display message after app connects
connectionMessage = () => { 
    console.log(" ____  _  _  ____  __     __  _  _  ____  ____")
    console.log("(  __)( \\/ )(  _ \\(  )   /  \\( \\/ )(  __)(  __)")
    console.log(" ) _) / \\/ \\ ) __// (_/\\(  O ))  /  ) _)  ) _)")
    console.log("(____)\\_)(_/(__)  \\____/ \\__/(__/  (____)(____)")
    console.log("  ____  ____   __    ___  __ _  ____  ____  ")    
    console.log(" (_  _)(  _ \\ / _\\  / __)(  / )(  __)(  _ \\  ")   
    console.log("   )(   )   //    \\( (__  )  (  ) _)  )   /  ") 
    console.log("  (__) (__\\_)\\_/\\_/ \\___)(__\\_)(____)(__\\_)  ") 
    
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
                {
                    name: 'View All Departments',
                    value: 'view_depts'
                },
                {
                    name:'Add a Department',
                    value: 'add_depts'
                },
                {
                    name: 'View All Roles',
                    value: 'view_roles'
                },
                {
                    name: 'Add a Role',
                    value: 'add_roles'
                },
                {
                    name: 'View All Employees',
                    value: 'view_emps'
                },
                {
                    name: 'Add an Employee',
                    value: 'add_emps'
                },
                {
                    name: 'Update an Employee Role',
                    value: 'update_emp_roles'
                },
                {
                    name: 'No Actions Necessary',
                    value: 'exit_CLI'
                }
            ]
        }
    ])
    .then(function (answer) {
        switch (answer.choices) {
            case'view_depts':
                userViewDepts();
                break;
            case 'add_depts':
                userAddDepts();
                break;
            case 'view_roles':
                userViewRoles();
                break;
            case 'add_roles':
                userAddRole();
                break;
            case 'view_emps':
                userViewEmployees();
                break;
            case 'add_emps':
                userAddEmployee();
                break;
            case 'update_emp_roles':
                userUpdateEmpRole();
                break;
            case 'exit_CLI':
                exitCLI();
                break;
            default:
                break;
            };
        })
    };

userViewDepts = () => {
    database.viewDepts()
        .then(([rows]) => {
            let department = rows; 
            console.log('\n');
            console.table(department);
        })
        .then(() => userPrompts());
}

userAddDepts = () => {
    inquirer.prompt([
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

userViewRoles = () => {
    database.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => userPrompts());
}

userAddRole = () => {
    database.viewDepts()
        .then(([rows]) => {
            let department = rows;
            const deptOptions = department.map(({ id, name }) =>({
                name: name,
                value: id
            }));

        inquirer.prompt([
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
                choices: deptOptions
            }
        ])
            .then(roles => {
                database.addRole(roles)
                    .then(() => console.log(`${roles.title} has been added to the role database.`))
                    .then(() => userPrompts())
            })
        })
}

userViewEmployees = () => {
    database.viewEmployees()
        .then(([rows]) => {
            let employee = rows;
            console.log('\n');
            console.table(employee);
        })
        .then(() => userPrompts());
}

userAddEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'Please enter the new employee\'s first name: \n'
        },
        {
            name: 'last_name',
            message: 'Please enter the new employee\'s last name: \n'
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            database.viewRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleOptions = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    
            inquirer.prompt([
                {
                type: 'list',
                name: 'rolesID',
                message: 'Please select the new employee\'s role: ',
                choices: roleOptions
                }
            ])
                .then(res => {

                    let rolesID = res.rolesID;

                database.viewEmployees()
                    .then(([rows]) => {
                        let employee = rows;
                        const managerOptions = employee.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));
                    managerOptions.unshift({ name: 'None', value: null});
            
            inquirer.prompt({ 
                type: 'list',
                name: 'managerID',
                message: 'Please select the new employee\'s manager: ',
                choices: managerOptions
                })
                .then(res => {
                    let employee = {
                        manager_id: res.managerID,
                        roles_id: rolesID,
                        first_name: firstName,
                        last_name: lastName
                    }
                database.addEmployee(employee);
                })
                    .then(() => console.log(
                        `${firstName} ${lastName} has been added to the database!`
                    ))
                .then(() => userPrompts());
                    })
                })            
        })
    })
}

userUpdateEmpRole = () => {
    database.viewEmployees()
        .then(([rows]) => {
            let employee = rows
            const employeeOptions = employee.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
    inquirer.prompt ([
        {
            type: 'list',
            name: 'employeeID',
            message: 'Please select the employee whose role you\'d like to update:',
            choices: employeeOptions
        }
    ])
        .then(res => {
            let employeeID = res.employeeID;
            database.viewRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const rolesOptions = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
    inquirer.prompt ([
        {
            type: 'list',
            name: 'rolesID',
            message: 'Please select the employee\'s new role:',
            choices: rolesOptions
        }
    ])
        .then(res => database.userUpdateEmpRole(employeeID, res.rolesID))
        .then(() => console.log('The employee\'s role has been updated in the database.'))
        .then(() => userPrompts())
            });
        });
    })
}

exitCLI = () => {
    process.exit();
}