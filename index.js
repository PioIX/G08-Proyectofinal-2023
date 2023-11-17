const express = require("express");
const exphbs = require("express-handlebars");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session'); //Para usar variables de sesión

const app = express();
app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(express.urlencoded({ extended: false })); // habria que ponerlo en true ??? el firebase de Paul lo tenia en true
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const Listen_Port = 3001;

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBZNavVfNszwuf9SEjJc7SpAgWIGYcd20",
  authDomain: "echenique-y-kunca.firebaseapp.com",
  projectId: "echenique-y-kunca",
  storageBucket: "echenique-y-kunca.appspot.com",
  messagingSenderId: "266379247966",
  appId: "1:266379247966:web:28a516afe6b7700b740fcf"
};
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Importar AuthService
const authService = require("./authService");

app.get("/", (req, res) => {
  res.render("home (2)");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/deseahacer", (req, res) => {
  res.render("deseahacer");
});
app.get("/matrepaso", (req, res) => {
  res.render("matrepaso");
});
app.get("/ingrepaso", (req, res) => {
  res.render("ingrepaso");
});
app.get("/repaso", (req, res) => {
  res.render("repaso");
});
app.get("/georepaso", (req, res) => {
  res.render("georepaso");
});
app.get("/cienrepaso", (req, res) => {
  res.render("cienrepaso");
});
app.get("/repaso", (req, res) => {
  res.render("repaso");
});
app.get("/juega", (req, res) => {
  res.render("juega");
});
app.get("/matjuego", (req, res) => {
  res.render("matjuego");
});
app.get("/pistamat", (req, res) => {
  res.render("pistamat");
});
app.get("/geoinicio", (req, res) => {
  res.render("geoinicio");
});
app.get("/banderasgeo", (req, res) => {
  res.render("banderasgeo");
});
app.get("/pistaingles", (req, res) => {
  res.render("pistaingles");
});
app.get("/deseahacer", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("deseahacer");
});
app.get("/editar", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("editar");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  

  try {
    await authService.registerUser(auth, { email, password });
    await MySQL.realizarQuery(`INSERT INTO Usernamepf(nombre) VALUES ('${email}')`)
    res.render("login", {
      message: "Registro exitoso. Puedes iniciar sesión ahora.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.render("login", {
      message: "Error en el registro: " + error.message,
    });
  }
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await authService.loginUser(auth, {
      email,
      password,
    });
    req.session.score = 0
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    if (email == "mvortega@pioix.edu.ar"){
      res.redirect("/admin")
    }
    else{
      let user = await MySQL.realizarQuery(`SELECT * FROM Usernamepf WHERE  nombre = '${email}'`)
      if (user.length > 0 ) {
        res.redirect("/deseahacer");
      } else {
        res.render("register", {
          message: "Error en el inicio de sesión: " + error.message,
        });    
      }
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("register", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});

/*JUEGO INGLÉS*/
app.get('/inglesvi', async function(req, res)
{ console.log(req.query); 
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "ingles"`);     
    let pregfacil= Math.ceil(Math.random()*consulta.length)-1;
    req.session.pregfacil = pregfacil
    let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[pregfacil].id_pregunta}`);
    let correcta= ""
    let numCorrecta= 0
    for (let i=0; i<consulta2.length; i++) {
        if (consulta2[i].es_correcta==true){
            correcta= consulta2[i].respuesta;
            numCorrecta= i+1;
        }
    }
    res.render('inglesvi', {NumCorrecta: numCorrecta, Correcta: correcta, Pregunta: consulta[pregfacil].pregunta, Opcion1:consulta2[0].respuesta, Opcion2:consulta2[1].respuesta, Opcion3:consulta2[2].respuesta});
                                                                                                                               
});
app.post('/inglesvi', async function(req, res) {
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "ingles"`);   
    let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[req.session.pregfacil].id_pregunta}`);
    let consultapista= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf WHERE pista= '${consulta2[0].pista, consulta2[1].pista, consulta2[2].pista}'`);
    res.send(consultapista)
  });
 
app.put('/inglesvi', async function(req, res) {
  console.log("Soy un pedido PUT /inglesvi"); 
  if (req.body.elegido == req.body.correcto) {
      res.send({chequeo: true});
  } else {
      res.send({chequeo: false});
  }
});

/*JUEGO CAPITALES*/
app.get('/capitales', async function(req, res)
{ console.log(req.query); 
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "geografia"`);     
    let pregfacil= Math.ceil(Math.random()*consulta.length)-1;
    req.session.pregfacil = pregfacil
    let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[pregfacil].id_pregunta}`);
    let correcta= ""
    let numCorrecta= 0
    for (let i=0; i<consulta2.length; i++) {
        if (consulta2[i].es_correcta==true){
            correcta= consulta2[i].respuesta;
            numCorrecta= i+1;
        }
    }
    res.render('capitales', {NumCorrecta: numCorrecta, Correcta: correcta, Pregunta: consulta[pregfacil].pregunta, Opcion1:consulta2[0].respuesta, Opcion2:consulta2[1].respuesta, Opcion3:consulta2[2].respuesta});
                                                                                                                               
});
app.put('/capitales', async function(req, res) {
  console.log("Soy un pedido PUT /capitales"); 
  if (req.body.elegido == req.body.correcto) {
      res.send({chequeo: true});
  } else {
      res.send({chequeo: false});
  }
});
app.post('/capitales', async function(req, res) {
  let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "geografia"`);   
  let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[req.session.pregfacil].id_pregunta}`);
  let consultapista= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf WHERE pista= '${consulta2[0].pista, consulta2[1].pista, consulta2[2].pista}'`);
  res.send(consultapista)
});

/*JUEGO CIENCIA*/

app.get('/ciencia', async function(req, res)
{ console.log(req.query); 
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "ciencia"`);     
    let pregfacil= Math.ceil(Math.random()*consulta.length)-1;
    req.session.pregfacil = pregfacil
    let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[pregfacil].id_pregunta}`);
    let correcta= ""
    let numCorrecta= 0
    for (let i=0; i<consulta2.length; i++) {
        if (consulta2[i].es_correcta==true){
            correcta= consulta2[i].respuesta;
            numCorrecta= i+1;
        }
    }
    res.render('ciencia', {NumCorrecta: numCorrecta, Correcta: correcta, Pregunta: consulta[pregfacil].pregunta, Opcion1:consulta2[0].respuesta, Opcion2:consulta2[1].respuesta, Opcion3:consulta2[2].respuesta});
                                                                                                                               
});
app.put('/ciencia', async function(req, res) {
  if (req.session.score == undefined || req.session.correctas == undefined){
    req.session.score = 0
    req.session.correctas = 0
  }
  console.log("Soy un pedido PUT /ciencia"); 
  console.log(req.session.score)
  if (req.body.elegido == req.body.correcto) {
      req.session.correctas ++
      req.session.score++
      if (req.session.score == 10){
        res.send({chequeo: true, status: true});
        req.session.score = 0
      } else {
        res.send({chequeo: true,  status: false});
      }
      //await MySQL.realizarQuery(`UPDATE Estadisticaspf SET nota= nota+3 WHERE id_usuario="${req.session.id_usuario}" AND id_materia= "ciencia"`);
  } else {
      req.session.score++
      res.send({chequeo: false});
  }
});

app.post('/ciencia', async function(req, res) {
  let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "ciencia"`);   
  let consulta2= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf INNER JOIN Preguntasdef ON Respuestaspf.id_pregunta = Preguntasdef.id_pregunta WHERE Respuestaspf.id_pregunta = ${consulta[req.session.pregfacil].id_pregunta}`);
  let consultapista= await MySQL.realizarQuery(`SELECT * FROM Respuestaspf WHERE pista= '${consulta2[0].pista, consulta2[1].pista, consulta2[2].pista}'`);
  res.send(consultapista)
});


/*ESTADISTICA CIENCIA
app.get('/estadisticaciencia', async function(req, res)
{
    console.log("soy un pedido GET /estadisticaciencia");
    consulta = await MySQL.realizarQuery(`SELECT * FROM Estadisticaspf ORDER BY nota DESC LIMIT 3`);
    let vector = [];
    for (let i=0; i<consulta.length; i++) {
        let consulta2= await MySQL.realizarQuery(`SELECT nombre FROM Usernamepf INNER JOIN Estadisticaspf ON Usernamepf.id_usuario=Estadisticaspf.id_usuario WHERE Usernamepf.id_usuario = ${consulta[i].id_usuario}`);
        vector.push(consulta2[0].nombre);
    }
    res.render('estadisticaciencia', {nombreUser1: vector[0], puntuacion1: consulta[0].nota, puntuacion2: consulta[1].nota, puntuacion3: consulta[2].nota}); 
});
*/
/*PEDIDOS GENERALES ADMIN!*/
app.get('/editar', function(req, res)
{
    console.log("Soy un pedido GET /editar", req.query); 
    res.render('editar', null); 
});

app.get('/admin', function(req, res)
{
    console.log("Soy un pedido GET /admin", req.query); 
    res.render('admin', null); 
});

app.get('/agregar', function(req, res)
{
    console.log("Soy un pedido GET /agregar", req.query); 
    res.render('agregar', null); 
});

app.get('/eliminadmin', function(req, res)
{
    console.log("Soy un pedido GET /eliminar", req.query); 
    res.render('eliminadmin', null);
});

/*FUNCIÓN EDITAR ADMIN!*/

// Muestra la pregunta!
app.post('/mostrarpregunta',async function(req, res){
  let id_pregunta = req.body.id_pregunta;
  console.log("Soy un pedido POST/mostrarpregunta", req.body); 
  if(id_pregunta == ""){
      console.log("Completa todos los campos")
      res.send({validar: false}); 
  } else{
      let pregunta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE id_pregunta = ${req.body.id_pregunta};`)
      console.log(pregunta);
      res.send({validar: true, pregunta: pregunta}); 
  }
});

// Modificar!
app.post('/editar', async function(req, res)
{
   function estaVacio(value) {
       return value === undefined || value === null || value === "";
   }
   console.log("ESTOY EDITANDO PREG");
  let id_pregunta = req.body.id_pregunta;
  let pregunta = req.body.pregunta;
  console.log("Soy un pedido POST/editarpreg", req.body);
  console.log(id_pregunta);
  console.log(pregunta);
  if(estaVacio(id_pregunta) || id_pregunta==0 || estaVacio(pregunta)){
      console.log("Completa todos los campos")
      res.send({validar: false});
  } else{
      await MySQL.realizarQuery(`UPDATE Preguntasdef SET pregunta = '${pregunta}'  WHERE id_pregunta = ${id_pregunta};`);
      console.log(await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE id_pregunta = ${id_pregunta};`))
      res.send({validar: true});
  }   
});


/*ELIMINAR!*/
app.get('/eliminar', function(req, res)
{
    console.log("Soy un pedido GET /eliminar", req.query); 
    res.render('eliminar', null);
});

app.post('/eliminar', async function(req, res)
{
    console.log("Soy un pedido POST /eliminar", req.query); 
    let idd = req.body.idPregunta; 
    console.log(idd)
    let consulta = await MySQL.realizarQuery(`SELECT id_pregunta FROM Preguntasdef WHERE id_pregunta = ${idd}`);
    if (consulta.length>0) {
        await MySQL.realizarQuery(`DELETE FROM Respuestaspf WHERE id_pregunta = ${idd}`);
        await MySQL.realizarQuery(`DELETE FROM Preguntasdef WHERE id_pregunta = ${idd}`);
        res.send({validar: true});
    } else {
        res.send({validar: false});
    }
});


/*AGREGAR CONTENIDO!*/
app.get('/agregar', function(req, res)
{
    console.log("Soy un pedido GET /agregar", req.query); 
    res.render('agregar', null); 
});

app.post('/agregar', async function(req, res)
{
    console.log("Soy un pedido POST/agregar", req.query); 
    let pregunta = req.body.agregarpregunta;
    let materia = req.body.materia;
    let correcta = req.body.correcta;
    let opcion1 = req.body.opcion1;
    let opcion2 = req.body.opcion2;
    function estaVacio(value) {
        return value === undefined || value === null || value === "";
    }
    if (estaVacio(pregunta) || estaVacio(correcta) || estaVacio(opcion1) || estaVacio(opcion2)){
        console.log("Completa todos los campos");
        res.send({validar: false, materia: "incorrecto"})
    } else {
        if(materia != "ingles" && materia != "geografia" && materia != "ciencia") {
            console.log("materiaincorrecta")
            res.send ({validar: true, materia: "incorrecto"});
        } else{
            console.log("materiacorrecta")
             console.log(pregunta);
             console.log(materia);
            await MySQL.realizarQuery(`INSERT INTO Preguntasdef (pregunta, materia) VALUES ("${pregunta}", "${materia}")`);
            let idpreguntanueva=await MySQL.realizarQuery(`SELECT id_pregunta FROM Preguntasdef WHERE pregunta = "${pregunta}"`)
            console.log(idpreguntanueva[0].id_pregunta)
            let esCorrecta = req.body.correcta === "true" ? 1 : 0;
            await MySQL.realizarQuery(`INSERT INTO Respuestaspf(id_pregunta, respuesta, es_correcta) VALUES ("${idpreguntanueva[0].id_pregunta}", "${req.body.correcta}", true)`);
            await MySQL.realizarQuery(`INSERT INTO Respuestaspf(id_pregunta, respuesta, es_correcta) VALUES ("${idpreguntanueva[0].id_pregunta}", "${req.body.opcion1}", false)`);
            await MySQL.realizarQuery(`INSERT INTO Respuestaspf(id_pregunta, respuesta, es_correcta) VALUES ("${idpreguntanueva[0].id_pregunta}", "${req.body.opcion2}", false)`);
            res.send({validar: true, materia: "correcto"});
            }
    }
});

/* ELIMINAR USUARIOS!*/
app.post('/eliminadmin', async function(req, res)
{ 
    console.log("Soy un pedido POST /eliminadmin", req.query); 
    let email = req.body.idusuario; 
    let user = await MySQL.realizarQuery(`SELECT * FROM Usernamepf WHERE  nombre = ('${email}')`)
    if (user.length>0) {
      await MySQL.realizarQuery(`DELETE FROM Usernamepf WHERE nombre = '${email}'`);
      res.send({validar: true});
  } else {
      res.send({validar: false});
} 
});
