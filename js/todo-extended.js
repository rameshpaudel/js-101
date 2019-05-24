// This file is an extended version of todo-objects
// Which further decouples the code into seperate classes
// We add LocalStorage's Data into the tasklist via class

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
       
       this.regenerateList(lists);
    }
    //Adding instance name to make accessible through DOM generated data
    addInstanceName(name){
        this.instance = name || {};
    }

    regenerateList(lists){
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
        if(!this.instance){
            throw Error("Add an instance name ")
        }
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
        statusRow.innerText = status ? "Complete" : "Incomplete";
    
        var options = document.createElement('td');
    
        var optionStatus = document.createElement('button');
        optionStatus.innerText = "Complete"
        optionStatus.classList.add('btn', 'btn-primary');
    
        optionStatus.setAttribute('onclick', `${this.instance}.toggleStatus(${sn})`)
    
        
        // optionStatus.addEventListener('click', toggleTask)
    
        var optionDelete = document.createElement('button');
        optionDelete.innerText = "Delete"
        optionDelete.classList.add('btn', 'btn-danger');
    
        optionDelete.setAttribute('onclick', `${this.instance}.removeList(${sn})`)
        //Adding event to the button 
        // optionDelete.addEventListener('click', deleteAction)
        //Appending buttons to the table
    
        options.append(optionStatus, optionDelete);
    
        tableRow.append(snDes, titleRow, dateRow, statusRow, options)
        return tableRow;
    }

    outputTask(element, cb){
        var tableBody = document.querySelector('tbody')
        // If we want to pass dynamic element
        if(element){
            tableBody = element
        }

        tableBody.innerHTML = "";
     
        for(var i =0; i < this.lists.length; i++){
            //Getting the specific data from the object
            const { title,createdAt,status}= this.lists[i]

            //Generating the html required for the output
            var tableRow = this.generateTask(i,title,createdAt,status)

            tableBody.append(tableRow)
        }
        if(typeof cb === 'function'){
            console.log("Running")
            cb();
        }
    
    }
    
}


class LocalStorageTaskList extends TaskList{
    constructor(localKey){
        super();
        this.LOCALKEY = 'todo-obj'
    }
    read(){
        var localData = JSON.parse(localStorage.getItem(this.LOCALKEY));
        this.regenerateList(localData)
    }
    
    store(){
        //Store the data to the localStorage if data is present
        localStorage.setItem(this.LOCALKEY, JSON.stringify(this.lists))
    }

    clear(){
        localStorage.removeItem(this.LOCALKEY);
        this.regenerateList(localData)
    }

    render(){
        this.outputTask(null, ()=>{ this.store() })
    }

}



var taskList = new LocalStorageTaskList()
taskList.addInstanceName('taskList');
taskList.read();
taskList.render()