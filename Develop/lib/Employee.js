//parent class - all different employee classes will extend off this one 
class Employee {
    //constructor sets name, id, and email to passed values 
    constructor(name,id,email) {
        this.name = name; 
        this.id = id; 
        this.email = email; 
    }
    //returns employee name 
    getName() {
        return this.name; 
    }
    //returns employee id
    getId() {
        return this.id; 
    }
    //returns employee email 
    getEmail() {
        return this.email; 
    }
    //return employee role - this will be overridden 
    getRole() {
        return "Employee"; 
    }
}

//export class 
module.exports = Employee; 