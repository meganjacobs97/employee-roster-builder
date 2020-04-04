//import employee class
const Employee = require("./Employee.js"); 

//engineer class inherits from employee 
class Engineer extends Employee {
    //constructor takes in and sets name,id,email, and github username 
    constructor(name,id,email,github) {
        //call parent constructor 
        super(name,id,email);

        this.github = github; 
    }
    //returns github username 
    getGithub() {
        return this.github; 
    }
    //overrides Employee.getRole()
    getRole() {
        return "Engineer"; 
    }
}

//export class 
module.exports = Engineer;