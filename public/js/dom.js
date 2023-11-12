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
      delay(5000).then(() => location.href = "/cienrepaso");
    } else {
        document.getElementById("botonpreguntaIng1").disabled = true;
        document.getElementById("botonpreguntaIng2").disabled = true;
        document.getElementById("botonpreguntaIng3").disabled = true;
        document.getElementById("botonpreguntaIng"+data2.numero).style.background = "lightgreen";
        delay(10).then(() => location.href = "/inglesvi");
    }
  } catch (error){
      console.error("Error:", error);
  }
}
function checkRespuesta(numero, elegido, correcto, numCorrecto) {
  console.log("aca tambien entre", correcto)
  console.log(numero, elegido, correcto, numCorrecto)
  let data2 = {
      numero: numero,
      elegido: elegido,
      correcto: correcto,
      numCorrecto: numCorrecto
  }
  putJSON2(data2);
}










/*jueg matematica 
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
/*chequea que el resultado sea siempre positivo

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

*/