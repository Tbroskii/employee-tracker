const inquirer = require('inquirer');
const mysql = require('mysql');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
  startApp();
});

// Start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments(connection, startApp);
          break;
        case 'View all roles':
          viewRoles(connection, startApp);
          break;
        case 'View all employees':
          viewEmployees(connection, startApp);
          break;
        case 'Add a department':
          addDepartment(connection, startApp);
          break;
        case 'Add a role':
          addRole(connection, startApp);
          break;
        case 'Add an employee':
          addEmployee(connection, startApp);
          break;
        case 'Update an employee role':
          updateEmployeeRole(connection, startApp);
          break;
        case 'Exit':
          connection.end();
          console.log('Application exited.');
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          startApp();
      }
    });
}