import express from "express";
import { crud_estudiante } from "./controllers/crud_estudiantes.js";
import { crud_tipo_sangre } from "./controllers/crud_tipo_sangre.js";

const app_e = express();

app_e.use(express.urlencoded({ extended: true }));
app_e.use(express.json());

app_e.use(express.static('./views'));
app_e.set('view engine', 'ejs');

app_e.listen('5000', function(){
    console.log('Aplicacion Iniciada: http://localhost:5000/');
});

app_e.get('/', crud_estudiante.leer);
app_e.post('/crud_e', crud_estudiante.cud);

app_e.get('/tipo_sangre', crud_tipo_sangre.leer);
app_e.post('/tipo_sangre/crud_ts', crud_tipo_sangre.cud);
