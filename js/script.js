// Sample data
const questions = [
    {
    text: "Which language is primarily used for web app development?",
    options: ["C#", "Python", "JavaScript", "Swift"],
    correct: 2
},
{
    text: "Which of the following is a relational database management system?",
    options: ["Oracle", "Scala", "Perl", "Java"],
    correct: 0
},
{
    text: "In which language is memory management provided by JVM?",
    options: ["Java", "C", "C++", "Python"],
    correct: 0
},
{
    text: "What does HTML stand for?",
    options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
    correct: 2
},
{
    text: "Which of the following is not a valid variable name in Python?",
    options: ["_myVar", "myVar2", "2myVar", "my_var"],
    correct: 2
},
{
    text: "Which of the following is not an object-oriented programming language?",
    options: ["Java", "C#", "Scala", "C"],
    correct: 3
},
{
    text: "Which tool is used to ensure code quality in JavaScript?",
    options: ["JSLint", "TypeScript", "Babel", "Webpack"],
    correct: 0
},
{
    text: "In which data structure, elements are added at one end and removed from the other?",
    options: ["Array", "Stack", "Queue", "LinkedList"],
    correct: 2
},
{
    text: "What is the primary use of the Git command 'clone'?",
    options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
    correct: 1
},
{
    text: "What does API stand for in the context of programming?",
    options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
    correct: 1
}
];

document.body.style.padding = "50px";
document.body.style.font = "16px sans-serif";
document.body.style.textAlign ='center';
document.body.style.width ='fit-content';
document.body.style.margin ='0px auto';
document.body.style.background = "linear-gradient(90deg, rgba(217,38,135,1) 0%, rgba(34,114,170,1) 50%, rgba(217,38,135,1) 100%)";

let questn_text=document.getElementById('question'); 
let answer_list=document.getElementById('answer-list');
answer_list.style.listStyleType="none";
answer_list.style.textAlign="left";

let quiz_container=document.querySelector('.quiz-container');
quiz_container.style.background='#fff';
quiz_container.style.width='30vw';
quiz_container.style.padding='20px';
quiz_container.style.textAlign ='center';

//inputs to maintain current next ques
let current=document.createElement('input');
current.type="hidden";
current.name="current_questn";
current.id="current_questn";
current.value="0";
let next=document.createElement('input');
next.type="hidden";
next.name="next_questn";
next.id="next_questn";
next.value="1";
quiz_container.append(current,next);

//buttons
let footer_div=document.createElement('div');
let submitButton=document.getElementById('submit');
submitButton.style.cursor="pointer";
submitButton.style.background="#ebc334";
submitButton.style.color="#444";
submitButton.style.border="1px solid #ebc334";
submitButton.style.padding="8px 16px";

let nextButton=document.getElementById('next');
nextButton.style.cursor="pointer";
nextButton.style.display="none"; 
nextButton.style.background="#ebc334";
nextButton.style.color="#444";
nextButton.style.border="1px solid #ebc334";
nextButton.style.padding="8px 16px";
footer_div.append(submitButton,nextButton);
footer_div.style.display="flex";
footer_div.style.justifyContent="center";
quiz_container.append(footer_div);


function SubmitAnswer(questions,submitButton,nextButton,current,next,questn_text,answer_list,answer){
    let answerFromQuestions=parseInt(questions[parseInt(current.value)].correct);    
    let CorrectAns=document.querySelector(`.list_item_${answerFromQuestions}`);
    CorrectAns.style.background="rgb(144, 238, 144)";
    questions[parseInt(current.value)].answer=parseInt(answer);
    if(current.value==questions.length-1){
        current.value='0';
        next.value='1';
        CalcMarks(questions,submitButton,nextButton,current,next,questn_text,answer_list);                
    }
    // LoadData(questions,submitButton,nextButton,parseInt(current.value),parseInt(next.value),questn_text,answer_list);    
}
function LoadData(questions,submitButton,nextButton,current,next,questn_text,answer_list){
    submitButton.style.display="block"; 
    nextButton.style.display="none";  
    answer_list.innerHTML='';
    // console.log(current+"----"+next);
    questn_text.textContent=questions[current].text;
    for (let i = 0; i < questions[current].options.length; i++) {
        let li =document.createElement('li');
        li.className ="list_item_"+i;
        let radio=document.createElement('input');
        radio.type='radio';
        radio.name='answer_'+current;
        radio.id='answer_'+i;
        radio.className='answer_'+current;
        radio.value=i;
        let label=document.createElement('label');
        label.setAttribute("for",'answer_'+i);
        label.textContent=questions[current].options[i];
        label.style.cursor="pointer";
        li.append(radio,label);    
        answer_list.appendChild(li);
    }
    let li_s=document.querySelectorAll('li'); 
    for (const elem of li_s) {
        elem.style.padding="8px";
        elem.onmouseover = function() {
            elem.style.background = 'rgb(245, 245, 245)';
        }
        elem.onmouseout = function() {
            elem.style.background = 'none';
        }
    } 
}
function CalcMarks(questions,submitButton,nextButton,current,next,questn_text,answer_list){
    let score=0;
    questions.forEach(e => {
        if(e.correct==e.answer){
            score+=1;
        }
    });
    alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    LoadData(questions,submitButton,nextButton,parseInt(current.value),parseInt(next.value),questn_text,answer_list);

}

submitButton.addEventListener("click", () => { 
    let answer=document.querySelector(`input[name="answer_${parseInt(current.value)}"]:checked`);
    if(answer!=null || answer!=undefined){
        answer=answer.value;
        submitButton.style.display="none"; 
        nextButton.style.display="block";       
        SubmitAnswer(questions,submitButton,nextButton,current,next,questn_text,answer_list,answer);
    }       
    else{
        alert("Please select an answer!");return false;
    }        
});

nextButton.addEventListener("click", () => {
    // Write the JS code that you want to be executed each time the Next button is clicked.
    submitButton.style.display="block"; 
    nextButton.style.display="none";    
    if(parseInt(next.value)==questions.length-1){
        current.value=next.value;
        next.value='0';
    }else{
        current.value=next.value;
        next.value=parseInt(next.value)+1;
    }

    LoadData(questions,submitButton,nextButton,parseInt(current.value),parseInt(next.value),questn_text,answer_list);

});
LoadData(questions,submitButton,nextButton,parseInt(current.value),parseInt(next.value),questn_text,answer_list);




 
