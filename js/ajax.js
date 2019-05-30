
var outputBox = document.querySelector("#output")
var generatedBox = document.querySelector("#generated")
var fetchFile = new XMLHttpRequest();

//This event is fired when the ajax request is successful
fetchFile.onload= function(){
    //We can manipulate the response that we got from the server
    var parsedValue = JSON.parse(this.response);

    //this represents the XMLHttpRequest object that we have instanciated
    console.log("The request object",this)

    console.log(parsedValue)

    // Manipulating the data

    if(parsedValue.data && parsedValue.data.length){
        for(var i= 0; i < parsedValue.data.length; i++){
            //Genearate the output

            generatedBox.innerHTML += generateList(parsedValue.data[i]); ///generateList is custom function
        }
    }





    //The response from the server 
    // outputBox.innerText = this.response;
    
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
    fetchFile.open("GET","https://reqres.in/api/users?page=2");
    fetchFile.send();
})



function generateList(obj){
    return `
        <div class="col-md-4">
            <div class="col-md-4">
                <img src="${obj.avatar}" >
            </div>
            <div class="col-md-8">
                <h3>${obj.first_name} ${obj.last_name}</h3>
                <a href="mailto:${obj.email}">${obj.email}</a>
            </div>
        </div>
    `
}