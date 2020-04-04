//import employee class
const Employee = require("./Employee.js"); 

//intern class inherits from employee 
class Intern extends Employee {
    //constructor takes in and sets name, id, email, and school 
    constructor(name,id,email,school) { 
        //call parent constructor 
        super(name,id,email); 

        this.school = school; 
    }
    //returns employee's school 
    getSchool() {
        return this.school; 
    }
    //overrides Employee.getRole()
    getRole() {
        return "Intern"; 
    }
}

module.exports = Intern;