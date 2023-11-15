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