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

//======= Add functions ==================================
function addDepartment() {
    inquirer
      .prompt({
          name: "newdepartment",
          type: "input",
          message: "What is the name of the new department?"
      })
      .then(function(answer) {
          var query = "INSERT INTO department (depName) VALUES (?)";
          connection.query(query, answer.newdepartment, function(err, res) {
           if (err) throw err;
           console.log("the " + answer.newdepartment + "department was created");
           runSearch();
          });
      });
}

function addRoles() {
    inquirer
      .prompt({
          name: "newdepartment",
          type: "input",
          message: "What is the name of the new department?"
      })
      .then(function(answer) {
          var query = "INSERT INTO department (depName) VALUES (?)";
          connection.query(query, answer.newdepartment, function(err, res) {
           if (err) throw err;
           console.log("the " + answer.newdepartment + "department was created");
           runSearch();
          });
      });
}

//==== Display functions ==================================

function viewDepartments(){
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
        console.log(
            "Department ID: " + res[i].id + " || Department Name: " + res[i].depName
        );
    }

    runSearch();
    });
}

function viewRoles(){
    connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
        console.log(
            "Role ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id
        );
    }


    runSearch();
    });
}

function viewEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
        console.log(
            "Employee ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id
        );
    }

    runSearch();
    });
}

//===== updating functions ====================

function updateEmployee(){
    inquirer
    .prompt({
        name: "employee",
        type: "input",
        message: "Which employee do you want to update?"
    },
    {
        name: "role",
        type: "input",
        message: "What new role does this employee have?"
    })
    .then(function(answer) {

        var employee;

        connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++){
                var name = res[i].first_name + " " + res[i].last_name;

                if (name == answer.employee){
                  employee = res[i];
                  console.log(employee);
                  return employee;
                } 
                console.log("this employee doesnt exist");
            }
        });

        
        connection.query("SELECT * FROM roles", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++){
               var role = 
            }

        });

        
      runSearch();
    });
}

