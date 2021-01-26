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
                addRoles();
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

function addEmployee() {
    inquirer
      .prompt([{
          name: "first",
          type: "input",
          message: "What is the first name of this employee?"
      },
        {
          name: "last",
          type: "input",
          message: "What is this employees last name?"
        },
         {
            name: "role",
            type: "input",
            message: "What role does this employee have?"
        },
        {
            name: "manager",
            type: "input",
            message: "What is this employees manager ID (if none enter 01)?"
        }
    ])
    .then(function(answer) {

       getRoleID(answer.role).then(function(roleId){
        

        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, [answer.first, answer.last, roleId, answer.manager], function(err, res) {
           if (err) throw err;
           console.log("the employee " + answer.first + ' ' + answer.last + " was added");
           runSearch();
        });


       });
    })
}

function addRoles() {
    inquirer
      .prompt([{
          name: "newRole",
          type: "input",
          message: "What is the name of the new Role?"
      },
      {
         name: "salary",
         type: "input",
         message: "What is this roles salary?"
      },
      {
        name: "department",
        type: "input",
        message: "What department is this role in?"
     }])
      .then(function(answer) {
          
        var depId;

        connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++){
               var dep = res[i];

               if (answer.department == dep.depName){
                   depId = dep.id;
                   console.log(depId);
                   return depId;
               }
            } console.log("This department does not exist!");
        });


        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(query, [answer.newRole, answer.salary, depId], function(err, res) {
           if (err) throw err;
           console.log("the " + answer.newRole + "position was created");
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
    .prompt([{
        name: "employeeFirst",
        type: "input",
        message: "What is the first name of the employee you want to update?"
    }, 
    {
        name: "employeeLast",
        type: "input",
        message: "What is the last name of the employee you want to update?"
    },
    {
        name: "role",
        type: "input",
        message: "What new role does this employee have?"
    }])
    .then(function(answer) {

        var roleID = getRoleID(name)
        

        connection.query("UPDATE empoyee SET ? WHERE ? AND ?",
        [{role_id: roleID}, 
            {first_name: answer.employeeFirst},
            {last_name: employeeLast}],
             function(err, res) {
            if (err) throw err;
           
        });

        
    
        console.log("This employees role has been updated!");
        runSearch();
    });
}



//========== roles to Role_id ==============


async function getRoleID(name){
 var role = await new Promise((resolve,rejects) => {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
           var currentRole = res[i];

           if (currentRole.title == name) {
               roleID = currentRole.id;
              resolve(roleID);
           }
           
        } 
        
        rejects("This role does not exist");

    });
 })
return role;
}
