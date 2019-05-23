// TOdo
//Step 1
    // Choosing the data format 


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


//Add items to DOM

var tList = new TaskList(
    // [
    // createTask("hello", Date(), true),
    // createTask("test", Date(), true)
    //]
);


tList.addList("Go fishing", Date(), false)
tList.addList("Go hunting", Date(), false)
tList.addList("Get groceries", Date(), false)
tList.addList("Travel to city", Date(), false)

// tList.outputTask();


//----------------------------------------------------------------
function addTask(){
    var askQuestion = prompt("Enter the task you want to complete")
    console.log(askQuestion)

    tList.addList(askQuestion, Date(), false)
}


function toggleTask(position){
    tList.toggleStatus(position)
}
function removeTask(position){
    tList.removeList(position)
    // e.parentElement.parentElement.remove()
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
document.querySelector("#toggle-status").addEventListener('click', toggleAllTasks)
document.querySelector("#add").addEventListener('click', addTask)