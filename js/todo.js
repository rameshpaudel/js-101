var task = document.querySelector(".todo-item");
var tableBody = document.querySelector('tbody');
var toggleStatusElement = document.querySelector('#toggle-status')

var toggleStatus = function (element) {
    var text = element.innerText;
    var textList = text.split(" ");
    //Getting the value of the text and toggling hide
    if (textList[0].toLowerCase() === "show") {
        element.innerText = "Hide " + textList[1]
    } else {
        element.innerText = "Show " + textList[1]
    }
}

// Toggle between coplete and incomplete text in the button and status column
var toggleCompletion = function (element) {
    var text = element.innerText;
    var currentTableRow = element.parentElement.parentElement;

    //Getting the value of the text and toggling hide
    if (text.trim().toLowerCase() === "incomplete") {
        element.innerText = "Complete"
        currentTableRow.children[3].innerText = "Incomplete"
    } else {
        element.innerText = "Incomplete"
        currentTableRow.children[3].innerText = "Complete"
    }
}


//Change the task status -> show or hide
var toggleTask = function (e) {
    // console.log(e);
    e.srcElement.parentElement.parentElement.classList.toggle('hide')
    //Toggle complete || incomplete
    toggleCompletion(e.srcElement)
}

//Remove the parent of the button that was clicked
var deleteAction = function (e) {
    e.srcElement.parentElement.parentElement.remove()
}

//Generate todo element to add inside the table body
var generateTodo = function (sn, title, date, status) {
    //JS allows the user to pass any number of args so we check if the sn is present
    if (typeof sn === 'undefined') {
        throw Error("There must be a serial number to run this behaviour")
    }
    var tableRow = document.createElement('tr');

    var snDes = document.createElement('td');
    snDes.innerText = sn;

    var titleRow = document.createElement('td');
    titleRow.innerText = title;

    var dateRow = document.createElement('td');
    dateRow.innerText = date;

    var statusRow = document.createElement('td');
    statusRow.innerText = status;

    var options = document.createElement('td');

    var optionStatus = document.createElement('button');
    optionStatus.innerText = "Complete"
    optionStatus.classList.add('btn', 'btn-primary');

    optionStatus.addEventListener('click', toggleTask)

    var optionDelete = document.createElement('button');
    optionDelete.innerText = "Delete"
    optionDelete.classList.add('btn', 'btn-danger');

    //Adding event to the button 
    optionDelete.addEventListener('click', deleteAction)
    //Appending buttons to the table

    options.append(optionStatus, optionDelete);

    tableRow.append(snDes, titleRow, dateRow, statusRow, options)

    return tableRow;

}

//Add the item to the table body
var addToList = function (sn, title, date, status) {
    var generatedData = generateTodo(sn, title, date, status)
    tableBody.append(generatedData)
}

// Get the formatted date
var formattedCurrentDate = function(){
    var date = new Date();
    var currentTime =  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()} ${timeParser(date)}`;
    return currentTime;
}

//Parsing the time to output in correct format
var timeParser = function(date){
    var hours = date.getHours();
    var timeOfDay = "AM";
    if(hours > 12){
        hours = hours - 12        
        timeOfDay = "PM"
    }

    return `${hours}:${date.getMinutes()}:${date.getSeconds()} ${timeOfDay}`
    
}

//Ask the user for input and add items to the body
var askUserAndOutput = () => {
    var response = prompt("Enter your todo item");
    var initialNumber = 0;

    if (tableBody.lastElementChild) {
        //parsing last sn field from the table
        var lastNumber = parseInt(tableBody.lastElementChild.children[0].innerText);
        initialNumber = lastNumber + 1;
    }


    //Adding to the list
    localStorage.setItem('todo'+initialNumber, `{ title: ${response}, createdAt: ${formattedCurrentDate()}, status: "Incomplete"}`)
    addToList(initialNumber, response, formattedCurrentDate(), 'Incomplete')
}

var toggleAllTasks = (e) => {
    var clickedElement = e.srcElement;
    toggleStatus(clickedElement);
    tableBody.classList.toggle('visible-all');
}
//=======================================================================
// Event Listeners
//=======================================================================

document.querySelector('#add').addEventListener('click', askUserAndOutput)


//Change the status of all the task
toggleStatusElement.addEventListener('click', toggleAllTasks)


// var counter = 5;

// function testThis(){
// 	if(counter < 10){
//     counter = counter + 1;
//     setTimeout(()=>{

//         console.log(counter)
//     }, counter * 100)
// 	testThis()
//     }
// }
