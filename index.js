// Your code here



// creates an employee record from an array of employee data
function createEmployeeRecord(employee) {
    // arrayData = [first, last, title, payrate]
    let dict;
    dict = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return dict;
}

// creates an array of employee records from arrays of employees' data
function createEmployeeRecords(allEmployees) {
    let allRecords=[];

  // kept running into index-out-of-range type errors because I had "i <= array.length", which returned undefined objects
    for (let i =0; i < allEmployees.length; i++) {
        let rec = createEmployeeRecord(allEmployees[i]);
        allRecords.push(rec);
    };

    /* couldn't "return (allRecords)" without getting [object, Object] 
    for each entry but for some reason I can "return (let arr = allRecords)" */
    let arr = allRecords;       
    return (arr);
}

// sets the timeInEvents object key of an employees record
function createTimeInEvent(employee, log) {
    //date = "YYYY-MM-DD HHMM"
    // parse date, split at " ".
    let timeEvent = log.split(" ");
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeEvent[1], 10),
        date: timeEvent[0]
    }
    employee.timeInEvents.push(timeInEvent);

    return employee;
}

function createTimeOutEvent(employee, log) {
    //date = "YYYY-MM-DD HHMM"
    // parse date, split at " ".
    let timeEvent = log.split(" ");
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(timeEvent[1], 10),   // format: parseInt(target, precision)
        date: timeEvent[0]
    }
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, day) {
    // 'date' format: "YYYY-MM-DD"
    // 'employee' is an employee record of type: dictionary
    // find employee.timeInEvents and employee.timeOutEvents with timeEvent dates matching the day argument
    // get hours = timeOut - timeIn 
    //return hours, type: integer



    // These return all the timeEvents that has a matching date
    let inEvent = employee.timeInEvents.find(o => o.date === day);
    let outEvent = employee.timeOutEvents.find(o => o.date === day);

    // This gets the hours worked on the given day
    let hoursWorked = outEvent.hour - inEvent.hour;

    hoursWorked = hoursWorked/100;          // divide by 100 to account for time being in military time

    return hoursWorked;

}

function wagesEarnedOnDate(employee, day) {

    let hours = hoursWorkedOnDate(employee, day);
    let earned = hours * employee.payPerHour;
    return earned;

}

function allWagesFor(employee) {
    // assume employees have clock-in and out data for any particular date.
    // while traversing the employee record for dates in the time-events, make calls to wagesEarnedOnDate and accumulate the total.
    // create an array of employee dates from clock-in (xor out) events.


    let total = 0;

    // This returns all the dates of the employees timeInEvents 
    let allInEvents = employee.timeInEvents;
    //let allOutEvents = employee.timeOutEvents;
    for (let j = 0; j < allInEvents.length; j++){
        let inDate = allInEvents[j].date;
        let wage = wagesEarnedOnDate(employee, inDate); 
        total += wage;           
        }
    

    return total

}

function calculatePayroll(allEmployees) {
    // for each employee, e, in the array, call allWagesFor(e) and accumulate the total
    //return total
    let total = 0;
    for (let i = 0; i < allEmployees.length; i++){
        let wages = allWagesFor(allEmployees[i]);
        total += wages;
    }

    return total;
}

