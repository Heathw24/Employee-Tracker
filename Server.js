var mysql = require("mysql");
var inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    // your port if not 3306
    port: 3306,

    user: "root",
    password: "root",
    database: "company_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View the departments",
                "View all roles",
                "View all employees",
                "Update an employee's role"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;
                
            case "Add an employee":
                addEmployee();
                break;
                
            case "View the departments":
                viewDepartments();
                break;
                
            case "View all roles":
                viewRoles();
                break;
                
            case "View all employees":
                viewEmployees();
                break;
                
            case "Update an employee's role":
                updateEmployee();
                break;  
   
            }
        });
}
