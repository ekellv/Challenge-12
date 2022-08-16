// requiring the connection to db file 
const connection = require('./connection');

// creating the employee database
class employeeDatabase {

    constructor(connection) {
        this.connection = connection;
    }

    // view departments function 
    viewDepts() {
        return this.connection.promise().query(
            `SELECT department.id, department.name FROM department`;
        );
    }

    // add departments function
    addDepts(department) {
        return this.connection.promise().query(
            `INSERT INTO department SET ?, department`;
        );
    }

    // view roles function
    viewRoles() {
        return this.connection.promise().query(
            `SELECT role.id. 
            role.title, 
            department.name AS department FROM role, 
            role.salary FROM role, 
            INNER JOIN department on role.department_id = department.id;`
        );
    }

    // add roles function 
    addRole() {
        return this.connection.promise().query(
            `INSERT INTO role SET ?`, role
        );
    }

    // view employees function
    viewEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department, 
            role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
            LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id`;
        );
    }

    // add employee function
    addEmployee() {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?`, employee 
        );
    }

    // update employee role function 
    updateEmpRole() {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`, 
            [roleID, employeeID]
        );
    }
}

// exporting new database to server.js
module.exports = new employeeDatabase(connection);