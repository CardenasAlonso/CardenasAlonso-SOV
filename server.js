const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = mysql.createConnection({
 host:"",
 user : "",
 password: "",
 database: "",
 port: 3306
});

db.connect(err =>{
    if(err){
        console.error("Error al conectar a la base de datos", err)
        return;
    }
    console.log("Conectado a la base de datos mysql");
});


app.get("/" , (req , res)=>{
    res.sendFile(__dirname + "/public/inicio.html");
});

app.listen(port , () => {
    console.log(`Servidor Escuchando en el puerto http://localhost:${port}`);
});


app.post('/consult', (req, res) => {
    const { name, email, telefono , message } = req.body;
    
    const sql = "INSERT INTO contacto (nombre, correo, telefono, mensaje) VALUES (?, ?, ?,?)";
    db.query(sql, [name, email, telefono , message], (err, results) => {
        if (err) {
            console.error('Error al hacer la consultas:', err);
            return res.status(500).json({ error: 'Error al hacer la consulta' });
        }
        res.json({ message: 'En unos momento atenderemos tu Consulta' });
    });
});

app.post('/comprar_producto', (req, res) => {
  const { nombre_cliente, correo_cliente, direccion_cliente, cantidad, metodo_pago ,id_producto } = req.body;

  // Suponiendo que tienes una tabla llamada 'compras' en tu base de datos
  const sql = "INSERT INTO compras (nombre_cliente, correo_cliente, direccion_cliente, cantidad, metodo_pago ,id_producto) VALUES (?, ?, ?, ?, ?,?)";
  
  db.query(sql, [nombre_cliente, correo_cliente, direccion_cliente, cantidad, metodo_pago ,id_producto], (err, results) => {
      if (err) {
          console.error('Error al registrar la compra:', err);
          return res.status(500).json({ error: 'Error al procesar la compra' });
      }
      res.json({ message: 'Compra realizada con éxito, pronto recibirás tu ventilador' });
  });
});

  

  app.get('/check-celebration', (req, res) => {
    const today = new Date().toISOString().split('T')[0]; 
  
    const query = 'SELECT * FROM celebraciones WHERE fecha = ?';
    db.query(query, [today], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la consulta' });
      }
  
      if (results.length > 0) {
        res.json({
          message: `¡Hoy es ${results[0].descripcion}!`,
          showMessage: true,
        });
      } else {
        res.json({ message: '', showMessage: false });
      }
    });
  });

  

db.query("SET time_zone = 'America/Lima'", function (err, results) {
  if (err) {
    console.error('Error setting time zone:', err);
  } else {
    console.log('Time zone set to America/Lima');
  }
});
