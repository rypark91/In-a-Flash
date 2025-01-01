let menu = document.querySelector("#menu");
let quiz = document.querySelector("input[name='quiz']");
let start = document.querySelector("#start");
let quizType = document.querySelector("input[name='quiz']:checked");

let multiChoice = document.querySelector("#multiChoice");
let trueOrFalse = document.querySelector("#trueOrFalse");
let fill = document.querySelector("#fill");

let easyRadio = document.querySelector("#easy");
let mediumRadio = document.querySelector("#medium");
let hardRadio = document.querySelector("#hard");
let multiRadio = document.querySelector("#multi");
let tfRadio = document.querySelector("#tf");
let blankRadio = document.querySelector("#blank");

let multiQuestion = document.querySelector("#multiQuestion");
let tfQuestion = document.querySelector("#tfQuestion");
let fillQuestion = document.querySelector("#fillQuestion");

let time1 = document.querySelector("#time1");
let time2 = document.querySelector("#time2");
let time3 = document.querySelector("#time3");

let choice1 = document.querySelector("#choice1");
let choice2 = document.querySelector("#choice2");
let choice3 = document.querySelector("#choice3");
let choice4 = document.querySelector("#choice4");
let choice5 = document.querySelector("#choice5");
let choice6 = document.querySelector("#choice6");





const deck = [
    {
        number: 1,
        answer: "one"
    },
    {
        number: 2,
        answer: "two"
    },
    {
        number: 3,
        answer: "three"
    },
    {
        number: 4,
        answer: "four"
    },
    {
        number: 5,
        answer: "five"
    },
    {
        number: 6,
        answer: "six"
    },
    {
        number: 7,
        answer: "seven"
    },
    {
        number: 8,
        answer: "eight"
    },
    {
        number: 9,
        answer: "nine"
    },
    {
        number: 10,
        answer: "ten"
    }
    ];


let trueButton = document.querySelector("#true");
let falseButton = document.querySelector("#false");

let fillAnswer = document.querySelector("#fillAnswer");
let answerButton = document.querySelector("#answerButton");

let outOfTime1 = document.querySelector("#outOfTime1");
let outOfTime2 = document.querySelector("#outOfTime2");


let difficulty = document.querySelector("input[name='difficulty']:checked");
let time = 10;
let intervalTime;

var question;
var score;
let deckCopy = deck;
let finalDeck = [];
start.addEventListener("click", function(){
    score = 0;
    deckCopy = deck;
    finalDeck = [];
    menu.style.display = "none";
    quizType = document.querySelector("input[name='quiz']:checked");
    difficulty = document.querySelector("input[name='difficulty']:checked");
    shuffleDeck(10, deckCopy, finalDeck);
    if(difficulty.value == "easy"){
        time = 10;
    }
    else if(difficulty.value == "medium"){
        time = 7;
    }
    else if(difficulty.value == "hard"){
        time = 4;
    }
    if(quizType.value == "multi"){
            multiChoice.style.display = "block";
            time1.textContent = time;
            question = finalDeck.pop();
            setUpMulti(question);
            intervalTime = setInterval(function(){
            time--;
            time1.textContent = time;
            if(time == 0){
                outOfTime1.click();
            }
            }, 1000);
            
    }
    else if(quizType.value == "tf"){
        trueOrFalse.style.display = "block";
        time2.textContent = time;
        question = finalDeck.pop();
        setUpTF(question);
        intervalTime = setInterval(function(){
        time--;
        time2.textContent = time;
        if(time == 0){
            alert("times up");
            outOfTime2.click();
        }
        }, 1000);
        
    }
    else if(quizType.value == "blank"){
        fill.style.display = "block";
        time3.textContent = time;
        question = finalDeck.pop();
        setUpFill(question);
        intervalTime = setInterval(function(){
            time--;
            time3.textContent = time;
            
            if(time == 0){
                alert("times up");
                fillAnswer.value = "";
                fillFunction();
            }
        }, 1000);
        
    }
    
});
choice1.addEventListener("click",choiceSelect);
choice2.addEventListener("click",choiceSelect);
choice3.addEventListener("click",choiceSelect);
choice4.addEventListener("click",choiceSelect);
choice5.addEventListener("click",choiceSelect);
choice6.addEventListener("click",choiceSelect);
outOfTime1.addEventListener("click", choiceSelect);
outOfTime2.addEventListener("click", trueFalse);

trueButton.addEventListener("click",trueFalse);
falseButton.addEventListener("click",trueFalse);

answerButton.addEventListener("click",fillFunction);

easyRadio.addEventListener("click",checkRadios);
mediumRadio.addEventListener("click",checkRadios);
hardRadio.addEventListener("click",checkRadios);
multiRadio.addEventListener("click",checkRadios);
tfRadio.addEventListener("click",checkRadios);
blankRadio.addEventListener("click",checkRadios);



function choiceSelect(e){
    
    if(e.target.value == question.answer){
        alert("correct");
        score++;
    }
    else if(e.target.value == "outOfTime"){
        alert("times up");
        
    }
    else{
        alert("incorrect");
    }
    clearInterval(intervalTime);
    if(finalDeck.length == 0){
        menu.style.display = "block";
        multiChoice.style.display = "none";
        alert(`score: ${score}`);
        
    }
    else{
        question = finalDeck.pop();
        if(difficulty.value == 'easy'){
            time = 10;
        }
        else if(difficulty.value == 'medium'){
            time = 7;
        }
        else if(difficulty.value == 'hard'){
            time = 4;
        }
        
        time1.textContent = time;
        setUpMulti(question);
        intervalTime = setInterval(function(){
        time--;
        time1.textContent = time;
        if(time == 0){
            outOfTime1.click();
        }
        
    }, 1000);
    }
    
}
function trueFalse(e){
    if(e.target.value == "outOfTime"){
        alert("times up");
    }
    else if(e.target.value == 'correct'){
        alert('correct');
        score++;
    }
    else if(e.target.value = 'incorrect'){
        alert('incorrect');
    }
    
    clearInterval(intervalTime);
    if(finalDeck.length == 0){
        menu.style.display = "block";
        trueOrFalse.style.display = "none";
        alert(`score: ${score}`);
        
    }
    else{
        question = finalDeck.pop();
        if(difficulty.value == 'easy'){
            time = 10;
        }
        else if(difficulty.value == 'medium'){
            time = 7;
        }
        else if(difficulty.value == 'hard'){
            time = 4;
        }
        time2.textContent = time;
        setUpTF(question);
        intervalTime = setInterval(function(){
            time--;
            time2.textContent = time;
        
        if(time == 0){
            
            outOfTime2.click();
        }
    }, 1000);
    }
    
}
function fillFunction(){
    
        
        clearInterval(intervalTime);
        
        if(String(fillAnswer.value).toLowerCase() == question.answer){
            alert("Correct");
            score++;
        }
        else if(time == 0){
            alert("times up");
        }
        else{
            alert("Incorrect");
        }
        fillAnswer.value = "";
        if(finalDeck.length == 0){
            menu.style.display = "block";
            fill.style.display = "none";
            alert(`score: ${score}`);
            
        }
        else{
            
            question = finalDeck.pop();
            if(difficulty.value == 'easy'){
                time = 10;
            }
            else if(difficulty.value == 'medium'){
                time = 8;
            }
            else if(difficulty.value == 'hard'){
                time = 5;
            }
            time3.textContent = time;
            setUpFill(question)
            intervalTime = setInterval(function(){
            
            time--;
            time3.textContent = time;
            if(time == 0){
                fillAnswer.value = "";
                fillFunction();
            }
            
        }, 1000);
        
        }
        
    
}

function shuffleDeck(length, arr1, arr2){

    var i = 1;
    while(i <= length){
      
        var num = Math.floor(Math.random() * arr1.length);
        arr2.push(arr1[num]);
        arr1.splice(num, 1);
        i++;
    }
  }
function setUpMulti(card){
    multiQuestion.textContent = card.number;
    var numbers = ["one","two","three","four","five","six","seven","eight","nine","ten"];
    var correctCardNumber = Math.floor(Math.random() * 6) + 1;
    var finalNumbers = [];
    var i = 1;
    while(i < 6){
        var num = numbers[Math.floor(Math.random() * 10)];
        
        if(!finalNumbers.includes(num) && 
        card.answer !== num){
            finalNumbers.push(num)
            i++;
        }
    }
    if(correctCardNumber == 1){
        choice1.value = card.answer;
        choice2.value = finalNumbers[0];
        choice3.value = finalNumbers[1];
        choice4.value = finalNumbers[2];
        choice5.value = finalNumbers[3];
        choice6.value = finalNumbers[4];
        choice1.textContent = card.answer;
        choice2.textContent = finalNumbers[0];
        choice3.textContent = finalNumbers[1];
        choice4.textContent = finalNumbers[2];
        choice5.textContent = finalNumbers[3];
        choice6.textContent = finalNumbers[4];
    }
    else if(correctCardNumber == 2){
        choice1.value = finalNumbers[0];
        choice2.value = card.answer;
        choice3.value = finalNumbers[1];
        choice4.value = finalNumbers[2];
        choice5.value = finalNumbers[3];
        choice6.value = finalNumbers[4];
        choice1.textContent = finalNumbers[0];
        choice2.textContent = card.answer;
        choice3.textContent = finalNumbers[1];
        choice4.textContent = finalNumbers[2];
        choice5.textContent = finalNumbers[3];
        choice6.textContent = finalNumbers[4];
    }
    else if(correctCardNumber == 3){
        choice1.value = finalNumbers[0];
        choice2.value = finalNumbers[1];
        choice3.value = card.answer;
        choice4.value = finalNumbers[2];
        choice5.value = finalNumbers[3];
        choice6.value = finalNumbers[4];
        choice1.textContent = finalNumbers[0];
        choice2.textContent = finalNumbers[1];
        choice3.textContent = card.answer;
        choice4.textContent = finalNumbers[2];
        choice5.textContent = finalNumbers[3];
        choice6.textContent = finalNumbers[4];
    }
    else if(correctCardNumber == 4){
        choice1.value = finalNumbers[0];
        choice2.value = finalNumbers[1];
        choice3.value = finalNumbers[2];
        choice4.value = card.answer;
        choice5.value = finalNumbers[3];
        choice6.value = finalNumbers[4];
        choice1.textContent = finalNumbers[0];
        choice2.textContent = finalNumbers[1];
        choice3.textContent = finalNumbers[2];
        choice4.textContent = card.answer;
        choice5.textContent = finalNumbers[3];
        choice6.textContent = finalNumbers[4];
    }
    else if(correctCardNumber == 5){
        choice1.value = finalNumbers[0];
        choice2.value = finalNumbers[1];
        choice3.value = finalNumbers[2];
        choice4.value = finalNumbers[3];
        choice5.value = card.answer;
        choice6.value = finalNumbers[4];
        choice1.textContent = finalNumbers[0];
        choice2.textContent = finalNumbers[1];
        choice3.textContent = finalNumbers[2];
        choice4.textContent = finalNumbers[3];
        choice5.textContent = card.answer;
        choice6.textContent = finalNumbers[4];
    }
    else if(correctCardNumber == 6){
        choice1.value = finalNumbers[0];
        choice2.value = finalNumbers[1];
        choice3.value = finalNumbers[2];
        choice4.value = finalNumbers[3];
        choice5.value = finalNumbers[4];
        choice6.value = card.answer;
        choice1.textContent = finalNumbers[0];
        choice2.textContent = finalNumbers[1];
        choice3.textContent = finalNumbers[2];
        choice4.textContent = finalNumbers[3];
        choice5.textContent = finalNumbers[4];
        choice6.textContent = card.answer;
    }
}
function setUpTF(card){
    
    var numbers = ["one","two","three","four","five","six","seven","eight","nine","ten"];
    var correctBoolean = Math.floor(Math.random() * 2);
    //if number does not match actual answer
    if(correctBoolean == 0){
        trueButton.value = 'incorrect';
        falseButton.value = 'correct';
        var num = numbers[Math.floor(Math.random() * 10)];
        while(num == card.answer){
            num = numbers[Math.floor(Math.random() * 10)];
        }
        var finalNum = num;
        tfQuestion.textContent = card.number + ` is ${finalNum}`;
    }
    //if number does match actual answer
    else if(correctBoolean == 1){
        trueButton.value = 'correct';
        falseButton.value = 'incorrect';
        tfQuestion.textContent = card.number + ` is ${card.answer}`;
    }
}
function setUpFill(card){
    fillQuestion.textContent = card.number;
    
}
function checkRadios(){
     if((easyRadio.checked || mediumRadio.checked || hardRadio.checked) && 
    (multiRadio.checked || tfRadio.checked || blankRadio.checked)){
        start.disabled = false;
    }
    else{
        start.disabled = true;
    }
}
checkRadios();