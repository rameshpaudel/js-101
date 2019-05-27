//1 question
// 2 question -> class

function createQuestion(question,options,answer, point = 1){
    return {
        question,
        options,
        answer,
        point
    }
}


class Quiz{
    constructor(questions){
        this.questions = questions || [];
        this.currentPosition = 0;
    }

    addQuestion(question){
        this.questions.push(question)
    }

    display(){
        var outputBox = document.querySelector('#output');
        outputBox.innerHTML = ""
        outputBox.append(this.createHTML(this.questions[this.currentPosition ]))
    
    }
    nextQuestion(){
        if(this.currentPosition < this.questions.length - 1){
            this.currentPosition++
            this.display()
        } else{
            alert("You've completed the quiz")
        }
    }
    
    prevQuestion(){
        if(this.currentPosition < 1){
            alert("This is the first question")
        } else {
            this.currentPosition--
            this.display()  
        }
    }
    createHTML(obj){
        var question = document.createElement("div");
        question.innerHTML = obj.question + "<br/>"

        //Replacing all the spaces into dashed format
        obj.id = obj.question.toLowerCase().replace(new RegExp(" ", 'g'),"-");
        
        var opt1 = this.createRadioButton(obj,0)
        var opt2 = this.createRadioButton(obj,1)
        var opt3 = this.createRadioButton(obj,2)
        var opt4 = this.createRadioButton(obj,3)

        question.append(opt1,opt2,opt3,opt4);
        return question;
        
    }
    createRadioButton(obj,position){
        var label1 = document.createElement('label');

        var opt1 = document.createElement('input')
        opt1.setAttribute('type', 'radio');
        opt1.setAttribute('name', obj.id)
        
        label1.innerHTML = "&nbsp;&nbsp;" + obj.options[position];
        label1.append(opt1);
        return label1;
    }
}
var quiz = new Quiz();

quiz.addQuestion(createQuestion("who is the national hero of nepal",["kp oli",'Baburam', "Tribhuwan","Prachnda"],2))
quiz.addQuestion(createQuestion("What is the capital city of Nepal?",["Kathmandu","Bhaktapur","Chitwon", "Nepalgunj"],0))
quiz.addQuestion(createQuestion("What is the capital city of China?",["Kathmandu","Bejing","Chitwon", "Nepalgunj"],1))
quiz.addQuestion(createQuestion("What is the value of x when x=3+2?",[10,5,7, 4],1))
quiz.display();


var nextBtn = document.querySelector('#next')
var prevBtn = document.querySelector('#prev')

nextBtn.addEventListener('click',(e)=>{
    if(quiz.currentPosition === quiz.questions.length -2){
        e.srcElement.innerText = "Finish"
    }
    quiz.nextQuestion()
})
prevBtn.addEventListener('click',(e)=>{
    if(quiz.currentPosition == 0){
        e.srcElement.innerText = "Click next to continue"
        e.preventDefault()
    }else{

        quiz.prevQuestion()
    }
})