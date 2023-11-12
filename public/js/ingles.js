let currentQuestion = document.querySelector('.question');
let choice1 = document.querySelector('#choice1-text');
let choice2 = document.querySelector('#choice2-text');
let choice3 = document.querySelector('#choice3-text');
let choice4 = document.querySelector('#choice4-text');

let result = document.querySelector('.result');
let button = document.querySelector('.submit');

let questionNum = 1;

const questions = {
  1: "Clara __ my best friend",
  2: "I __ an honest boy",
  3: "My toys  ___ in the box",
  4: "A/AM/I/STUDENT",
  5: "FATHER/HE/MY/IS/",
  6: "ELEPHANT/THE/BIG/IS",
  7: "I _____ football yesterday.",
  8: "My teacher ____ very happy",
  9: "She _____ a picture.",
  10: "We ______ the castle.",

};

const choices = { 
  1: ["are", "is", "am", "were"],
  2: ['am', 'are', 'is', "being"],
  3: ['is', 'am', 'are', 'was'],
  4: [" Student i am", "I am a student", "Am i a student", 'A student I am'],
  5: ['He is my father', 'My father is he', 'My father he is.', 'Is my father he'],
  6: ['Is the elephant big', 'Big is the elephant', 'The elephant is big ', 'The elephant were big'],
  7: ["play", "plays", "played", 'playing'],
  8: ['Was', 'Were', 'Are', 'being'],
  9: ['paint', 'painted ', 'is painted', 'were painting'],
  10: ["visit", "visited", "visits", 'visiting'],
};

currentQuestion.textContent = questions[questionNum];
choice1.textContent = choices[questionNum][0];
choice2.textContent = choices[questionNum][1];
choice3.textContent = choices[questionNum][2];
choice4.textContent = choices[questionNum][3];

const checkChoice = () => {
   if (questionNum == 1) {
      if (document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
    };
  if (questionNum == 2) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice4').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
  };
  if (questionNum == 3) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
    };
    if (questionNum == 4) {
    if (document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
      };
     if (questionNum == 5) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
        };
        if (questionNum == 6) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
          };
      if (questionNum == 7) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
        };
       if (questionNum == 8) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
         };
         if (questionNum == 9) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
           };
           if (questionNum == 10) {
    if (document.querySelector('#choice2').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      }
  };
  
  button.setAttribute('value', 'Siguiente pregunta!');
  button.setAttribute('onclick', 'nextQuestion()');
  button.style.width = '200px';
};

const nextQuestion = () => {
  console.log('next');
  questionNum+=1;
  if (questionNum < 10) {
    console.log(questionNum);
    currentQuestion.textContent = questions[questionNum];
    choice1.textContent = choices[questionNum][0];
    choice2.textContent = choices[questionNum][1];
    choice3.textContent = choices[questionNum][2];
    choice4.textContent = choices[questionNum][3];
  };
  button.setAttribute('value', 'Verifica tu respuesta');
  button.setAttribute('onclick', 'checkChoice()');
  button.style.width = '130px';
  result.textContent = "";
  document.querySelector('#choice1').checked = false;
  document.querySelector('#choice2').checked = false;
  document.querySelector('#choice3').checked = false;
  document.querySelector('#choice4').checked = false;
};




  