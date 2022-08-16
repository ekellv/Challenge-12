// requiring the connection to db file 
const connection = require('./connection');

// creating the employee database
class employeeDatabase {

    constructor(connection) {
        this.connection = connection;
    }

    viewDepts() {
        return this.connection.promise().query(
            `SELECT department.id, department.name FROM department`;
        );
    }

    addDepts(department) {
        return this.connection.promise().query(
            `INSERT INTO department SET ?, department`;
        );
    }

    viewRoles() {
        return this.connection.promise().query(
            `SELECT role.id. 
            role.title, 
            department.name AS department FROM role, 
            role.salary FROM role, 
            INNER JOIN department on role.department_id = department.id;`
        );
    }

    addRole() {
        return this.connection.promise().query(
            `INSERT INTO role SET ?`, role
        );
    }

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

    addEmployee() {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?`, employee 
        );
    }

    updateEmpRole() {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`, 
            [roleID, employeeID]
        );
    }
}

module.exports = new employeeDatabase(connection);