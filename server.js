// importing required node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// importing connection to db
const dbLink = require('./config/index');

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
    dbLink.viewDepts()
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
        dbLink.addDepts(name)
            .then(() => console.log(`${name.name} has been added to the department database.`))
            .then(() => userPrompts());
    })
}

userViewRoles = () => {
    dbLink.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => userPrompts());
}

userAddRole = () => {
    dbLink.viewDepts()
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
                dbLink.addRole(roles)
                    .then(() => console.log(`${roles.title} has been added to the role database.`))
                    .then(() => userPrompts())
            })
        })
}

userViewEmployees = () => {
    dbLink.viewEmployees()
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
            name: "first_name",
            message: "What's the employee's first name?"
        },
        {
            name: "last_name",
            message: "What's the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            dbLink.viewRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt({
                        type: "list",
                        name: "roleId",
                        message: "What's the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            dbLink.viewEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    inquirer.prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who's the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            dbLink.addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => userPrompts())
                                })
                        })
                })
        })
}

userUpdateEmpRole = () => {
    dbLink.viewEmployees()
    .then(([rows]) => {
        let employee = rows;
        const employeeOptions = employee.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: "list",
                name: "employeeID",
                message: "Which employee's role do you want to update?",
                choices: employeeOptions
            }
        ])
            .then(res => {
                let employeeID = res.employeeID;
                dbLink.viewRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleOptions = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }));

                        inquirer.prompt([
                            {
                                type: "list",
                                name: "rolesID",
                                message: "What's the new role of this employee?",
                                choices: roleOptions
                            }
                        ])
                            .then(res => dbLink.updateEmpRole(employeeID, res.rolesID))
                            .then(() => console.log("Employee's role is updated"))
                            .then(() => userPrompts())
                    });
            });
    })
}

exitCLI = () => {
    process.exit();
}