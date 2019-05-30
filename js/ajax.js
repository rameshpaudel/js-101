
var outputBox = document.querySelector("#output")
var fetchFile = new XMLHttpRequest();

//This event is fired when the ajax request is successful
fetchFile.onload= function(){
    //this represents the XMLHttpRequest object that we have instanciated
    // console.log("The request object",this)
    console.log(this.response)

    //The response from the server 
    outputBox.innerText = this.response;
    
}

// //onreadystatechange fires each time the the readyState property is changed
fetchFile.onreadystatechange = function(e){
    //ReadyState property changes from 4 times 

    if(this.readyState === 3){
        
    }
    // console.log('The event',e)
    //this.statusText -> Checks the status in text format
    
    console.log('Ready state change', this.status)
}

document.querySelector("#make-request").addEventListener('click',()=>{
    fetchFile.open("GET","http://localhost/test.txt");
    fetchFile.send();
})

