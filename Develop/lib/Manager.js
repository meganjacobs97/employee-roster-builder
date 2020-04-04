//import employee class
const Employee = require("./Employee.js"); 

//manager class inherits from employee
class Manager extends Employee  {
    //constructor takes in and sets name, id, email, and office number 
    constructor(name,id,email,officeNumber) { 
        //call parent constructor 
        super(name,id,email); 

        this.officeNumber = officeNumber; 
    }
    //returns office number 
    getOfficeNumber() {
        return this.officeNumber; 
    }
    //overrides Employee.getRole()
    getRole() {
        return "Manager"; 
    }
}

//export class
module.exports = Manager;