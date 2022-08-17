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
            `SELECT department.id, department.name FROM department`
        );
    }

    // add departments function
    addDepts(department) {
        return this.connection.promise().query(`INSERT INTO department SET ?`, department);
    }

    // view roles function
    viewRoles() {
        return this.connection.promise().query(
            `SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles INNER JOIN department on roles.department_id = department.id;`
        );
    }

    // add roles function 
    addRole(roles) {
        return this.connection.promise().query(
            `INSERT INTO roles SET ?`, roles
        );
    }

    // view employees function
    viewEmployees() {
        return this.connection.promise().query(
            `SELECT * FROM employee`
            // `SELECT employee.id, 
            // employee.first_name, 
            // employee.last_name, 
            // roles.title, 
            // department.name AS department, 
            // roles.salary, 
            // CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            // FROM employee 
            // LEFT JOIN roles ON employee.role_id = role.id, 
            // LEFT JOIN department ON roles.department_id = department.id, 
            // LEFT JOIN employee manager ON employee.manager_id = manager.id;`
        );
    }

    // add employee function
    addEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, employee);
    }

    // update employee role function 
    updateEmpRole() {
        return this.connection.promise().query(
            `UPDATE employee SET roles_id = ? WHERE id = ?`, 
            [rolesID, employeeID]
        );
    }
}

// exporting new database to server.js
module.exports = new employeeDatabase(connection);