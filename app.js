const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const managerPrompt = [
    {
        type: "input", 
        name: "name",
        message: "Enter Managers Name"
    },

    {
        type: "input", 
        name: "id",
        message: "Enter Managers ID"
    },

    {
        type: "input", 
        name: "email",
        message: "Enter Managers Email"
    },

    {
        type: "input", 
        name: "officeNumber",
        message: "Enter Office Number"
    },

    {
        type: "list", 
        name: "addEmployees",
        message: "Additional Employees?",
        choices: ["yes", "no"]
    }
];



const  employeePrompt = [
    {
        type: "input", 
        name: "name",
        message: "Enter Employees Name"
    },

    {
        type: "input", 
        name: "id",
        message: "Enter Employees ID"
    },

    {
        type: "input", 
        name: "email",
        message: "Enter Employees Email"
    },

    {
        type: "list", 
        name: "role",
        message: "Select Employees role",
        choices: ["Engineer", "Intern"]

    },

    {
        when: input=> {return input.role == "Engineer"},
        type: "input", 
        name: "Github",
        message: "Enter Github username"
    },

    {
        when: input=> {return input.role == "Intern"},
        type: "input", 
        name: "school",
        message: "Enter Intern's school"
    },


    {
        type: "list", 
        name: "addEmployees",
        message: "Additional Employees?",
        choices: ["yes", "no"]
    }
];


    let employees =  []
            function addEmployee(){
                inquirer.prompt(employeePrompt).then(empInput => {

                   if (empInput.role == "Engineer") {
                       let engineer =  new Engineer(empInput.name, empInput.id, empInput.email, empInput.Github) 
                       employees.push(engineer)
                   }else {
                       let intern =  new Intern(empInput.name, empInput.id, empInput.email, empInput.school) 

                       employees.push(intern)
                   }
             
                    
                     if (empInput.addEmployees == "yes") {
                        addEmployee()
                     }

                     //Comment: add the newly added employee to the HTML

                     let html = render(employees)
                     fs.writeFileSync("./output/team.html", html)
             
                 }) 

            }


    inquirer.prompt(managerPrompt).then(mgrInput => {

       let manager = new Manager (mgrInput.name, mgrInput.id, mgrInput.email, mgrInput.officeNumber)

        employees.push(manager)

        if (mgrInput.addEmployees == "yes") {

            addEmployee()
        }
        let html = render(employees)
        
        fs.writeFileSync("./output/team.html", html)

    }) 

    