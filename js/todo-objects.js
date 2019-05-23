const LOCALKEY = 'todo-obj'

function createTask(title, createdAt, status){
    return {
        title,
        createdAt,
        status
    }
}


class TaskList{
    constructor(lists)
    {
        this.lists = [];
        //Check if an array is passed through the constructor
        // and assign to lists if its present
        if(lists && Array.isArray(lists)){
            this.lists = lists;
        }
    }

    resetList(){
        this.lists = [];
        //Regenerate once the data is reset
        this.outputTask()
    }
    addList(title, createdAt, status){
        var task = createTask(title, createdAt, status)
        this.lists.push(task);
        //Regenerate the dom each time users adds a task
        this.outputTask()
    }

    removeList(index){
        this.lists.splice(index,1)

        //Regenerate the dom each time users removes a task
        this.outputTask()
    }

    toggleStatus(index){
        this.lists[index].status = ! this.lists[index].status

        this.outputTask()
    }

    generateTask(sn,title,date, status){
        var tableRow = document.createElement('tr');
        if(status){
            //Adding hide class if the task is completed
            tableRow.classList.add('hide')
        }
        var snDes = document.createElement('td');
        snDes.innerText = sn + 1;
    
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
    
        optionStatus.setAttribute('onclick', `toggleTask(${sn})`)
    
        
        // optionStatus.addEventListener('click', toggleTask)
    
        var optionDelete = document.createElement('button');
        optionDelete.innerText = "Delete"
        optionDelete.classList.add('btn', 'btn-danger');
    
        optionDelete.setAttribute('onclick', `removeTask(${sn})`)
        //Adding event to the button 
        // optionDelete.addEventListener('click', deleteAction)
        //Appending buttons to the table
    
        options.append(optionStatus, optionDelete);
    
        tableRow.append(snDes, titleRow, dateRow, statusRow, options)
        return tableRow;
    }

    outputTask(element){
        var tableBody = document.querySelector('tbody')
        //If we want to pass dynamic element
        // if(element){
        //     tableBody = element
        // }
        tableBody.innerHTML = "";
     
        for(var i =0; i < this.lists.length; i++){
            //Getting the specific data from the object
            const { title,createdAt,status}= this.lists[i]

            //Generating the html required for the output
            var tableRow = this.generateTask(i,title,createdAt,status)

            tableBody.append(tableRow)
        }
           
        //Store the data to the localStorage if data is present
        localStorage.setItem(LOCALKEY, JSON.stringify(this.lists))
    
        
    }
    
}


//Read the data in localstorage

var localData = JSON.parse(localStorage.getItem(LOCALKEY));

//Add items to DOM
var tList = new TaskList(localData);
//Output data if items were found on localStorage
if(localData){
    tList.outputTask();
}
//----------------------------------------------------------------

function addTask(){
    var askQuestion = prompt("Enter the task you want to complete")
    //Add the user's answer to the todo lists
    tList.addList(askQuestion, Date(), false)
}


function toggleTask(position){
    tList.toggleStatus(position)
}

function removeTask(position){
    tList.removeList(position)
}



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

var toggleAllTasks = (e) => {
    var clickedElement = e.srcElement;
    toggleStatus(clickedElement);
    document.querySelector('tbody').classList.toggle('visible-all');
}

//Clear todo list from localstorage
var clearList = (e)=>{
    localStorage.clear();

    //Repopulate the dom once the localStorage data is cleared
    tList.resetList();
}

//Event Listeners
document.querySelector("#toggle-status").addEventListener('click', toggleAllTasks)
document.querySelector("#add").addEventListener('click', addTask)
document.querySelector("#clear-status").addEventListener('click', clearList)