import './style.css'
import {Question, questions} from "./question"

const questionsElement = document.querySelector(".question") as HTMLHeadingElement;
const optionsElement = document.querySelector(".options") as HTMLUListElement;
//const nextButton = document.querySelector(".btn_next") as HTMLButtonElement;
const scoreElement = document.querySelector(".score") as HTMLParagraphElement;

let currentQuestionIndex = 0
let score = 0;

// export type Question = {
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

function displayQuestion(question: Question) {

    // Visa frågan 
    questionsElement.textContent = question.question;

    // Visa svarsalternativen
    const lis = question.options.map( (option) => {
      return `<li>${option}</li>`
    }).join("");

    // Visar svarsalternativen i listan
    optionsElement.innerHTML = lis;

    // Lääga till en eventlister för varje svarsalternativ

    document.querySelectorAll('li').forEach(li => {
        li.addEventListener("click", () => {
            // Checkanswer / Gå till nästa fråga
            // ! - i TS betyder det "non-null assertions operator" - "intyga" att elementet finns!
            checkAnswer(li.textContent!, question.correctAnswer)
        })
    });
}

function checkAnswer(selectedOption: string, correctAnswer: string) {

  // Om rätt svar 
  if( selectedOption === correctAnswer) {
    // Hantera rätt svar
    console.log("Correct ansser");
    score++
  } 
 
  //Gå till nästa fråga
  currentQuestionIndex++;

  // Visa nästa fråga så länge det finns frågor kvar i questionarrayen
  if(currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex])
  } else {
    // Meddela att quizet är slut
    console.log("Quiz completed");
   // nextButton.disabled = true;
    scoreElement.textContent = `Final score: ${score} / ${questions.length}`
  }

}

function initApp() {
  // Visa första frågan
  displayQuestion(questions[currentQuestionIndex])
}

initApp();

// nextButton.addEventListener("click", () => {
//   if(currentQuestionIndex < questions.length - 1) {
//     currentQuestionIndex++;
//     displayQuestion(questions[currentQuestionIndex])
//   }
// })