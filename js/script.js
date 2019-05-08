//document api on javascripts helps us to parse the html
// tree

var dynamicSelector = document.querySelector("#header h1");
var box = document.getElementsByClassName('box');
var heading = document.getElementById("header");
var output = document.getElementById("output");


var button  = document.querySelector('button');
var secondButton  = document.querySelectorAll('button')[1];

var textInput = document.querySelector('input[type="text"]')

function changeParentsBackground(e){
    console.log(e);
    var clickedElement =  e.srcElement;
    //e => MouseEvent 
    //e.target || e.srcElement => gives us the element that was clicked
    clickedElement.parentElement.style.backgroundColor = 'red'
}

//Force method
function changeParentColor(e){
    //Too specific
    button.parentElement.style.backgroundColor = "green"
}

document.body.oncontextmenu = function(e){
    console.log(e);
    console.log(e.type);
    e.preventDefault();
    button.style.padding = '20px'
}

button.onclick = changeParentsBackground;
secondButton.onclick = changeParentsBackground;


function doubleClick(e){
    console.log('Double clicked')
}
button.ondblclick = doubleClick
button.addEventListener('dblclick', doubleClick)
// button.addEventListener('click', doubleClick)


textInput.onkeypress = function(e){
    console.log(e)
    console.log(e.key, 'button pressed')
}

textInput.onkeyup = function(e){
    // console.log(e)
    console.log(e.key, 'button released')
}

textInput.onkeydown = function(e){
    // console.log(e)
    console.log(e.key, 'button currently pressing')
}




// Mouse Events

var mouseElement = document.querySelector('.mouse')

mouseElement.onmouseover = function(e){
    console.log(e, 'mouse over')
    var eventElement = e.srcElement
    if(eventElement){
        eventElement.children[0].innerText = "Mouse is over this element"
    }
    // e.target[0].inner
}

mouseElement.onmouseenter = function(e){
    console.log(e, 'mouse enter')
    e.srcElement.children[0].innerText = "Mouse is entering this element"
    // e.target[0].inner
}

mouseElement.onmouseleave = function(e){
    console.log(e, 'mouse leave')
    e.srcElement.children[0].innerText = "Mouse is leaving this element"
    // e.target[0].inner
}

document.querySelector('a').onclick = function(e){
    //preventDefault prevents from the element taking its default behaviour
    e.preventDefault();
    document.body.classList.toggle('bg-1');
    
}

