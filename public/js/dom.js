async function putJSON(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      if (result.validar == false) {
        alert("Los datos son incorrectos")
      } else {
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()
        document.getElementById("form1").submit()
      }

    } catch (error){
      console.error("Error:", error);
    }
  }
 
  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
  function login() {
    //Leo los datos del input
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("password").value

    //Creo un objeto de forma instantanea
    let data = {
        user: usuario,
        pass: contraseña
    }

    //data es el objeto que le paso al back
    putJSON(data)
  }

$(".custom-carousel").owlCarousel({
  autoWidth: true,
  loop: true
});
$(document).ready(function () {
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});


function irALogin() {
  location.href = '/register'
}

//juego geo
 // VARIABLE DECLARATIONS ------
  
      // pages
      var initPage,
      questionsPage,
      resultsPage,
      // buttons
      startBtn,
      submitBtn,
      continueBtn,
      retakeBtn,
      spanishBtn,
      // question and answers
      question,
      answerList,
      answerSpan,
      answerA,
      answerB,
      answerC,
      answerD,
      // event listeners
      answerDiv,
      answerDivA,
      answerDivB,
      answerDivC,
      answerDivD,
      feedbackDiv,
      selectionDiv,
      toBeHighlighted,
      toBeMarked,
      userScore,
      // quiz
      quiz,
      questionCounter,
      correctAnswer,
      correctAnswersCounter,
      userSelectedAnswer,
      // function names
      newQuiz,
      generateQuestionAndAnswers,
      getCorrectAnswer,
      getUserAnswer,
      selectAnswer,
      deselectAnswer,
      selectCorrectAnswer,
      deselectCorrectAnswer,
      getSelectedAnswerDivs,
      highlightCorrectAnswerGreen,
      highlightIncorrectAnswerRed,
      clearHighlightsAndFeedback;

//funciones
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

$(document).ready(function(){
 
  // DOM SELECTION ------
  
    // App pages
      // Page 1 - Initial
    initPage = $('.init-page');
      // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
      // Page 3 - Results
    resultsPage = $('.results-page');
  
    // Buttons
    startBtn = $('.init-page__btn');
    submitBtn = $('.questions-page__submit-btn');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');
  
    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');
  
    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');
  
    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');
  
    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');
  
    // User final score
    userScore = $('.results-page__score');
  
  // QUIZ (PODEMOS AGREGAR TODAS LAS BANDERAS DEL MUNDO) ------
    quiz = [
     {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/300px-Flag_of_Brazil.svg.png",
    answers: ["Argentina", "México", "Brasil", "Chile"],
    correctAnswer: "Brasil"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%29.svg/200px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%29.svg.png",
    answers: ["España", "Francia", "Italia", "Alemania"],
    correctAnswer: "Francia"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://s1.significados.com/foto/bandera-japon_sm.png", 
    answers: ["China", "Corea del Sur", "Japón", "India"],
    correctAnswer: "Japón"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langes-1500px-Flag_of_Germany.svg.png", 
    answers: ["Francia", "Italia", "Alemania", "España"],
    correctAnswer: "Alemania"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/310px-Flag_of_Italy.svg.png",
    answers: ["España", "México", "Italia", "Argentina"],
    correctAnswer: "Italia"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/2560px-Flag_of_Canada.svg.png",
    answers: ["Estados Unidos", "Canadá", "Reino Unido", "Australia"],
    correctAnswer: "Canadá"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://img.freepik.com/vector-gratis/bandera-china-estilo-dibujos-animados-aislado-sobre-fondo-blanco_1308-67445.jpg",
    answers: ["India", "China", "Japón", "Corea del Sur"],
    correctAnswer: "China"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
    answers: ["México", "Chile", "Brasil", "Argentina"],
    correctAnswer: "Argentina"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    answers: ["Nueva Zelanda", "Canadá", "Australia", "Sudáfrica"],
    correctAnswer: "Australia"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",
    answers: ["China", "Rusia", "India", "Estados Unidos"],
    correctAnswer: "Rusia"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/2560px-Flag_of_South_Africa.svg.png",
    answers: ["Nigeria", "Sudáfrica", "Egipto", "Ghana"],
    correctAnswer: "Sudáfrica"
  },
  {
    question: "¿De qué país es esta bandera ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/200px-Flag_of_Colombia.svg.png",
    answers: ["Perú", "Colombia", "Ecuador", "Venezuela"],
    correctAnswer: "Colombia"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/2560px-Flag_of_Chile.svg.png",
    answers: ["Argentina", "Perú", "Chile", "Bolivia"],
    correctAnswer: "Chile"
  },
  {
    question: "¿De qué país es esta bandera?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Flag_of_Peru_%281825%E2%80%931884%29.svg/270px-Flag_of_Peru_%281825%E2%80%931884%29.svg.png",
    answers: ["Chile", "Perú", "Ecuador", "Colombia"],
    correctAnswer: "Perú"
  },
   {
  question: "¿De qué país es esta bandera?",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/1200px-Flag_of_Greece.svg.png",
  answers: ["Inglaterra", "Sudáfrica", "Islandia", "Grecia"],
  correctAnswer: "Grecia"
},
{
  question: "¿De qué país es esta bandera?",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hopkinson_Flag.svg/200px-Hopkinson_Flag.svg.png",
  answers: ["Mexico", "Estados Unidos", "El salvador", "Inglaterra"],
  correctAnswer: "Estados Unidos"
},
{
  question: "¿De qué país es esta bandera?",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1024px-Flag_of_Turkey.svg.png",
  answers: ["Turquía", "Afganistan", "Turkmenistan", "Nigeria"],
  correctAnswer: "Turquía"
},
{
  question: "¿De qué país es esta bandera?",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg",
  answers: ["Alemania", "Ecuador", "Cuba", "Iran"],
  correctAnswer: "Cuba"
},
                  {
  question: "¿De qué país es esta bandera?",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1280px-Flag_of_Israel.svg.png",
  answers: ["Grecia", "Israel", "Argentina", "Honduras"],
  correctAnswer: "Israel"
},

];
  
// FUNCTION DECLARATIONS ------
  
  // Start the quiz
  newQuiz = function() { 
    // Set the question counter to 0
    questionCounter = 0;
    
    // Set the total correct answers counter to 0
    correctAnswersCounter = 0;
    
    // Hide other pages of the app
    questionsPage.hide();
    resultsPage.hide();
  };
  
  // Load the next question and set of answers
  generateQuestionAndAnswers = function() {
  shuffleArray(quiz);
    if (questionCounter % 5 === 0) {
    shuffleArray(quiz);
  }
   if (questionCounter < 5) {
    let image = document.getElementById("question-image");
    question.text(quiz[questionCounter].question);
    answerA.text(quiz[questionCounter].answers[0]);
    answerB.text(quiz[questionCounter].answers[1]);
    answerC.text(quiz[questionCounter].answers[2]);
    answerD.text(quiz[questionCounter].answers[3]);
    image.src = quiz[questionCounter].imageUrl;
   } else {
      questionsPage.hide();
    resultsPage.show(300);
    userScore.text(Math.floor((correctAnswersCounter / 5) * 100) + "%");
  }
};
  
  // Store the correct answer of a given question
  getCorrectAnswer = function() {
    correctAnswer = quiz[questionCounter].correctAnswer;
  };
  
  // Store the user's selected (clicked) answer
  getUserAnswer = function(target) {
    userSelectedAnswer = $(target).find(answerSpan).text();
  };

  // Add the pointer to the clicked answer
  selectAnswer = function(target) {
    $(target).find(selectionDiv).addClass('ion-chevron-right');
  };

  // Remove the pointer from any answer that has it
  deselectAnswer = function() {
    if (selectionDiv.hasClass('ion-chevron-right')) {
      selectionDiv.removeClass('ion-chevron-right');
    }
  };
  
  // Get the selected answer's div for highlighting purposes
  getSelectedAnswerDivs = function(target) {
    toBeHighlighted = $(target);
    toBeMarked = $(target).find(feedbackDiv);
  };
  
  // Make the correct answer green and add checkmark
  highlightCorrectAnswerGreen = function(target) {
    if (correctAnswer === answerA.text()) {
      answerDivA.addClass('questions-page--correct');
      answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
    }
    if (correctAnswer === answerB.text()) {
      answerDivB.addClass('questions-page--correct');
      answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
    }
    if (correctAnswer === answerC.text()) {
      answerDivC.addClass('questions-page--correct');
      answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
    }
    if (correctAnswer === answerD.text()) {
      answerDivD.addClass('questions-page--correct');
      answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
    }
  };
  
  // Make the incorrect answer red and add X
  highlightIncorrectAnswerRed = function() {
    toBeHighlighted.addClass('questions-page--incorrect');
    toBeMarked.addClass('ion-close-round');
  };
  
  // Clear all highlighting and feedback
  clearHighlightsAndFeedback = function() {
    answerDiv.removeClass('questions-page--correct');
    answerDiv.removeClass('questions-page--incorrect');
    feedbackDiv.removeClass('ion-checkmark-round');
    feedbackDiv.removeClass('ion-close-round');
  };
  
// APP FUNCTIONALITY ------
  
  /* --- PAGE 1/3 --- */
  
  // Start the quiz:
  newQuiz();
 // Clicking on start button:
startBtn.on('click', function(){
  
  // Advance to questions page
  initPage.hide();
  questionsPage.show(300);
  
  // Load question and answers
  generateQuestionAndAnswers();
  
  // Store the correct answer in a variable
  getCorrectAnswer();
  
  // Hide the submit and continue buttons
  submitBtn.hide();
  continueBtn.hide();
  
});  
 
  
  /* --- PAGE 2/3 --- */
  
  // Clicking on an answer:
  answerDiv.on('click', function(){
    
    // Make the submit button visible
    submitBtn.show(300);
    
    // Remove pointer from any answer that already has it
    deselectAnswer();
    
    // Put pointer on clicked answer
    selectAnswer(this);
    
    // Store current selection as user answer
    getUserAnswer(this);
    
    // Store current answer div for highlighting purposes
    getSelectedAnswerDivs(this);
    
  });
  
  // Clicking on the submit button:
  submitBtn.on('click', function(){
    
    // Disable ability to select an answer
    answerDiv.off('click');
      
    // Make correct answer green and add a checkmark
    highlightCorrectAnswerGreen();
    
    // Evaluate if the user got the answer right or wrong
    if (userSelectedAnswer === correctAnswer) {
      // Increment the total correct answers counter
      correctAnswersCounter++;
    }
    else {
      highlightIncorrectAnswerRed();
    }
    
    // Substitute the submit button for the continue button:
    submitBtn.hide(300);
    continueBtn.show(300);
    
  });
  
  // Clicking on the continue button:
  continueBtn.on('click', function(){
    
    // Increment question number until there are no more questions, then advance to the next page
    if (questionCounter < quiz.length - 1) {
      questionCounter++;
    }
    else {
      questionsPage.hide();
      resultsPage.show(300);
      // Display user score as a percentage
      userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + "%");
    }
    
    // Load the next question and set of answers
    generateQuestionAndAnswers();
    
    // Store the correct answer in a variable
    getCorrectAnswer();
    
    // Remove all selections, highlighting, and feedback
    deselectAnswer();
    clearHighlightsAndFeedback();
    
    // Hide the continue button
    continueBtn.hide(300);
    
    // Enable ability to select an answer
    answerDiv.on('click', function(){
      // Make the submit button visible
      submitBtn.show(300);
      // Remove pointer from any answer that already has it
      deselectAnswer();
      // Put pointer on clicked answer
      selectAnswer(this);
      // Store current answer div for highlighting purposes
      getSelectedAnswerDivs(this);
      // Store current selection as user answer
      getUserAnswer(this);
    });
    
  });
  
  /* --- PAGE 3/3 --- */

  // Clicking on the retake button:
  retakeBtn.on('click', function(){
    
    // Go to the first page
    resultsPage.hide();
    initPage.show(300);
  
    // Start the quiz over
    newQuiz();
    
  });

  
});
/*INGLES*/

function delay(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs));
}

async function putJSON2 (data2){   
  try {
    const response2 = await fetch("/inglesvi", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    });
    const result2 = await response2.json();
    console.log("Success:", result2);

    if (result2.chequeo == false) {
      document.getElementById("botonpreguntaIng"+data2.numCorrecto).style.background = "lightgreen";
      document.getElementById("botonpreguntaIng"+data2.numero).style.background = "pink";
      document.getElementById("botonpreguntaIng1").disabled = true;
      document.getElementById("botonpreguntaIng2").disabled = true;
      document.getElementById("botonpreguntaIng3").disabled = true;
      delay(5000).then(() => location.href = "/ingrepaso");
    } else {
        document.getElementById("botonpreguntaIng1").disabled = true;
        document.getElementById("botonpreguntaIng2").disabled = true;
        document.getElementById("botonpreguntaIng3").disabled = true;
        document.getElementById("botonpreguntaIng"+data2.numero).style.background = "lightgreen";
        delay(5000).then(() => location.href = "/inglesvi");
    }
  } catch (error){
      console.error("Error:", error);
  }
}
function checkRespuesta(numero, elegido, correcto, numCorrecto) {
  console.log("aca tambien entré", correcto)
  console.log(numero, elegido, correcto, numCorrecto)
  let data2 = {
      numero: numero,
      elegido: elegido,
      correcto: correcto,
      numCorrecto: numCorrecto
  }
  putJSON2(data2);
}


async function putJSON3 (data3){   
  try {
    const response3 = await fetch("/capitales", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data3),
    });
    const result3 = await response3.json();
    console.log("Success:", result3);

    if (result3.chequeo == false) {
      document.getElementById("botonpreguntaGeo"+data3.numCorrecto).style.background = "lightgreen";
      document.getElementById("botonpreguntaGeo"+data3.numero).style.background = "pink";
      document.getElementById("botonpreguntaGeo1").disabled = true;
      document.getElementById("botonpreguntaGeo2").disabled = true;
      document.getElementById("botonpreguntaGeo3").disabled = true;
      delay(5000).then(() => location.href = "/cienrepaso");
    } else {
        document.getElementById("botonpreguntaGeo1").disabled = true;
        document.getElementById("botonpreguntaGeo2").disabled = true;
        document.getElementById("botonpreguntaGeo3").disabled = true;
        document.getElementById("botonpreguntaGeo"+data3.numero).style.background = "lightgreen";
        delay(10).then(() => location.href = "/capitales");
    }
  } catch (error){
      console.error("Error:", error);
  }
}
function checkRespuesta2(numero, elegido, correcto, numCorrecto) {
  console.log("aca tambien entré", correcto)
  console.log(numero, elegido, correcto, numCorrecto)
  let data3 = {
      numero: numero,
      elegido: elegido,
      correcto: correcto,
      numCorrecto: numCorrecto
  }
  putJSON3(data3);
}

async function putJSON4 (data4){   
  try {
    const response2 = await fetch("/ciencia", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data4),
    });
    const result2 = await response2.json();
    console.log("Success:", result2);

    if (result2.chequeo == false) {
      document.getElementById("botonpreguntaCien"+data4.numCorrecto).style.background = "lightgreen";
      document.getElementById("botonpreguntaCien"+data4.numero).style.background = "pink";
      document.getElementById("botonpreguntaCien1").disabled = true;
      document.getElementById("botonpreguntaCien2").disabled = true;
      document.getElementById("botonpreguntaCien3").disabled = true;
      delay(5000).then(() => location.href = "/cienrepaso");
    } else {
        document.getElementById("botonpreguntaCien1").disabled = true;
        document.getElementById("botonpreguntaCien2").disabled = true;
        document.getElementById("botonpreguntaCien3").disabled = true;
        document.getElementById("botonpreguntaCien"+data4.numero).style.background = "lightgreen";
        delay(5000).then(() => location.href = "/ciencia");
    }
  } catch (error){
      console.error("Error:", error);
  }
}
function checkRespuesta3(numero, elegido, correcto, numCorrecto) {
  console.log("aca tambien entré", correcto)
  console.log(numero, elegido, correcto, numCorrecto)
  let data4 = {
      numero: numero,
      elegido: elegido,
      correcto: correcto,
      numCorrecto: numCorrecto
  }
  putJSON4(data4);
}
//jueg matematica 
const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateProblem() {
  state.currentProblem = generateProblem()
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
  }
  checkLogic()
}
//chequea que el resultado sea siempre positivo

function generateProblem() {
  let numberOne, numberTwo, operator, correctAnswer;

  do {
    numberOne = generateNumber(10);
    numberTwo = generateNumber(10);
    operator = ['+', '-', 'x'][generateNumber(2)];

    if (operator === '+') {
      correctAnswer = numberOne + numberTwo;
    } else if (operator === '-') {
      correctAnswer = numberOne - numberTwo;
    } else if (operator === 'x') {
      correctAnswer = numberOne * numberTwo;
    }
  } while (correctAnswer < 0);

  return {
    numberOne,
    numberTwo,
    operator
  };
}

function checkLogic() {
  if (state.score === 10) {
    endMessage.textContent = "¡HAS GANADO! Se nota que has estado practicando";
    document.body.classList.add("overlay-is-open");
    document.getElementById("final-score").textContent = `Puntaje final: ${state.score}`;
    setTimeout(() => resetButton.focus(), 331);
  }

  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Has perdido, repasa e intentalo de nuevo";
    document.body.classList.add("overlay-is-open");
    document.getElementById("final-score").textContent = `Tu puntaje final es de : ${state.score}`;
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}


//api

// falta llamar la funcion clima cuando se carga la pagina de inicio
async function clima()
{temp ="Temperatura: " + await fetchClima()
console.log(temp)
//poner temp en algun elemento de la pagina para que se vea
divClima=document.getElementById("clima")
if (divClima){
divClima.innerHTML = temp}
}


async function fetchClima() {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("http://ws.smn.gob.ar/map_items/weather", {
      method: "get", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
    });    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result[21].weather.tempDesc
    );
    
    return result[21].weather.tempDesc
   
  } catch (error) {
    console.error("Error:", error);
  }
}

// Función para actualizar el clima
async function actualizarClima() {
  const clima = await fetchClima();

  if (clima) {
    console.log("Clima actualizado:", clima[21].weather.tempDesc);
  } else {
    console.log("No se pudo obtener la información del clima.");
  }
}

// Actualizar el clima cada 10 minutos (600,000 milisegundos)
setInterval(actualizarClima, 600000);



async function pidiopista(data){ 
  try {
    const response3 = await fetch("/inglesvi", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result3 = await response3.json();
    console.log("Success:", result3);
    alert(result3[0].pista)
  } catch (error){
      console.error("Error:", error);
  }
}


/*FUNCIÓN EDITAR CONTENIDO ADMIN!*/

async function mostrarPutJSON(data) {
  try {
    const response = await fetch("/mostrarPregunta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log("Success:", result);
    if (result.validar == true) {
      document.getElementById("pregunta").value = result.pregunta[0].pregunta;  
    }
    else{
      document.getElementById("pregunta").value = "";  
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function mostrarPreg() {
  let id_pregunta = document.getElementById("id_pregmod").value
  let data = {
    id_pregunta: id_pregunta,
  }
  console.log(data)
  mostrarPutJSON(data)
}

async function modificarPutJSON(data) {
  try {
    const response = await fetch("/editar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
    if (result.validar == false) {
      alert("Complete los campos");  
    }
    else{
      document.getElementById("pregunta").value = ""
      location.href = "/editar";  
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

function modificarPreg() {
  let id_pregunta = document.getElementById("id_pregmod").value
  let pregunta = document.getElementById("pregunta").value
  let data = {
    pregunta : pregunta,
    id_pregunta: id_pregunta
  }
  console.log(data)
  modificarPutJSON(data)
}










































/*FUNCIÓN ELIMINAR ADMIN!*/

function eliminarPregunta() {
  let id = document.getElementById("idPregunta").value
  let data = {
    idPregunta: id
  }
  console.log(data) 
  fetchEliminarPregunta(data)
}

async function fetchEliminarPregunta(data) {

  try {
    const response = await fetch("/eliminar", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    if (result.validar == false) {
      alert("No existe una pregunta con ese ID")
    } else {
      location.href = "/eliminar"
      
    }

  } catch (error) {
    console.error("Error:", error);
  }
} 
























































/*AGREGAR CONTENIDO!*/

function agregarPreg() {
  let agregarpregunta = document.getElementById("agregarPregunta").value;
  let materia = document.getElementById("materia").value;
  let correcta = document.getElementById("correcta").value;
  let opcion1 = document.getElementById("opcion1").value;
  let opcion2 = document.getElementById("opcion2").value;

  let data = {
    agregarpregunta : agregarpregunta,
    materia : materia,
    correcta : correcta,
    opcion1 : opcion1,
    opcion2 : opcion2
  }
  console.log("data:")
  console.log(data)
  fetchAgregarPregunta(data)
}

async function fetchAgregarPregunta(data) {
  try {
    const response = await fetch("/agregar", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    if (result.materia=="incorrecto" && result.validar==true){
      alert("La materia es incorrecta, escribalo de la siguiente forma: ingles  geografia ciencia");
    } else if (result.validar == false && result.materia=="incorrecto" ) {
        alert("Los datos son incorrectos")
    } else if (result.validar==true && result.materia=="correcto" ){
        location.href = "/agregar";
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

<<<<<<< HEAD
/*FUNCION ELIMINAR USUARIOS!*/
function eliminarUsuarios() {
  let id = document.getElementById("idusuario").value
  let data = {
    idusuario: id
  }
  console.log(data) 
  fetchEliminarUsuarios(data)
}

async function fetchEliminarUsuarios(data) {
  
  try {
    const response = await fetch("/eliminadmin", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    if (result.validar == false) {
      alert("No existe un usuario con ese email.")
    } else {
      location.href = "/eliminadmin"      
    }

  } catch (error) {
    console.error("Error:", error);
  }
} 
=======
>>>>>>> e788de8a03a7641193f1eb2f9d81a1582c7688fe
