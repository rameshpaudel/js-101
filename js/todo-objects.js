// TOdo
//Step 1
    // Choosing the data format 


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
    }

    removeList(index){
        this.lists.splice(index,1)
    }

    toggleStatus(index){
        this.lists[index].status = ! this.lists[index].status
    }
    
}


var tList = new TaskList([
    createTask("hello", Date(), true),
    createTask("test", Date(), true)
]);


tList.addList("Go fishing", Date(), false)
tList.addList("Go hunting", Date(), false)
tList.addList("Get groceries", Date(), false)
tList.addList("Travel to city", Date(), false)