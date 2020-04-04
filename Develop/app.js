//get exports 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//import modules 
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//output directory and path of roster document 
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

//array of employee objects to be rendered 
const employeeArr = []; 

//for rendering the html to be displayed on the document 
const render = require("./lib/htmlRenderer.js");

//array for user input choices 
const inputArr = [
    //type of employee
    {
        type: "list",
        message: "Select the type of employee:",
        name: "employeeType",
        choices: ["Intern","Engineer","Manager"]
    },
    //all employees - name 
    {
        type: "input",
        message: "Enter the name of the employee",
        name: "name"
    },
    //all employees - id 
    {
        type: "input",
        message: "Enter the ID of the employee",
        name: "id"
    },
    //all employees - email 
    {
        type: "input",
        message: "Enter the email of the employee",
        name: "email"
    },
    //intern only - school 
    {
        type: "input", 
        message: "Enter the employee's school",
        name: "school",
        when: (response) => response.employeeType === 'Intern'
    },
    //engineer only - github username 
    {
        type: "input", 
        message: "Enter the employee's GitHub username",
        name: "github",
        when: (response) => response.employeeType === 'Engineer'
    },
    //manager only - office number 
    {
        type: "input", 
        message: "Enter the employee's office number",
        name: "officeNum",
        when: (response) => response.employeeType === 'Manager'
    },
    //ask if they want to add another employee 
    {
        type: "list",
        message: "Would you like to enter another employee?",
        name: "anotherEmployee",
        choices: ["Yes","No"]
    }
  ]

//handles inquirer prompts & makes calls to render and writefile
function prompt() {
    inquirer
    //use prompt array 
    .prompt(inputArr)
    .then(function(response) {
        //make an employee object based on which type of employee the user selected
        let employee = null; 
        if(response.employeeType === "Intern") {
            //intern constructor takes name, id, email, and school 
            employee = new Intern(response.name,response.id,response.email,response.school); 
        }
        else if(response.employeeType === "Engineer") {
            //engineer constructor takes name, id, email, and github username 
            employee = new Engineer(response.name,response.id,response.email,response.github); 
        }
        else {
            //manager constructor takes name, id, email, and office number 
            employee = new Manager(response.name,response.id,response.email,response.officeNum); 
        }

        //add employee to array 
        employeeArr.push(employee); 

        //if the user selected that they want to enter another employee, run function again 
        if(response.anotherEmployee === "Yes") {
            prompt(); 
        }
        //otherwise, we are ready to write to the file 
        else {
            try {
                //pass the array of employees to render to get the html 
                //then pass that return string to the write file function 
                writeToFile(render(employeeArr)); 
            } catch(error) {
                console.error(error);
            } 
        }
    }); 
}

//writes the employee data to a file 
function writeToFile(fileData) { 
    //check if directory exists. if not, create it 
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    
    ///write to file 
    fs.writeFile(outputPath,fileData,function(error) {
        if(error) {
            return console.log(error); 
        }
    }); 
}

//run the prompt 
prompt(); 