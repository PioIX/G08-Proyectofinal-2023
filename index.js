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

app.get("/georepaso", (req, res) => {
  res.render("georepaso");
});
app.get("/cienrepaso", (req, res) => {
  res.render("cienrepaso");
});
app.post("/repaso", (req, res) => {
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
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    if (email == "mvortega@pioix.edu.ar"){
      res.redirect("/admin")
    }
    else{
      res.redirect("/deseahacer");
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

/*JUEGO CIENCIA*/

app.get('/ciencia', async function(req, res)
{ console.log(req.query); 
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Preguntasdef WHERE materia= "ciencia"`);     
    let pregfacil= Math.ceil(Math.random()*consulta.length)-1;
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
  console.log("Soy un pedido PUT /ciencia"); 
  if (req.body.elegido == req.body.correcto) {
      res.send({chequeo: true});
  } else {
      res.send({chequeo: false});
  }
});

/*PEDIDOS GENERALES ADMIN!*/
app.get('/agregar', function(req, res)
{
    console.log("Soy un pedido GET /agregar", req.query); 
    res.render('agregar', null); 
});

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
