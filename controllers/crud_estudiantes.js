import { conectar } from "../models/db_conectar.js"
var crud_estudiante = ({});

crud_estudiante.leer = (req, res) => {
    const estudiantes = `
        SELECT s.id_estudiante,
            s.carne,
            s.nombres,
            s.apellidos,
            s.direccion,
            s.telefono,
            s.correo_electronico,
            ts.sangre,
            s.fecha_nacimiento
        FROM estudiantes AS s
        INNER JOIN tipo_sangre AS ts
        ON s.id_tipo_sangre = ts.id_tipo_sangre
        ORDER BY s.id_estudiante ASC;`;

    const tiposSangre = `
        SELECT ts.id_tipo_sangre,
            ts.sangre
        FROM tipo_sangre AS ts;`;

    conectar.query(estudiantes, (error, estudiantesResults) => {
        if (error) {
            throw error;
        } else {
            conectar.query(tiposSangre, (error, tipoSangreResults) => {
                if (error) {
                    throw error;
                } else {
                    res.render('colegio/estudiantes', {
                        estudiantes: estudiantesResults,
                        tiposSangre: tipoSangreResults
                    });
                }
            });
        }
    });
};


crud_estudiante.cud = (req, res)=>{
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id = req.body.txt_id;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo = req.body.txt_correo;
    const tiposangre = req.body.txt_tiposangre;
    const fn = req.body.txt_fn;

    if(btn_crear){
        conectar.query('INSERT INTO estudiantes SET ?', {
                carne:carne,
                nombres:nombres,
                apellidos:apellidos,
                direccion:direccion,
                telefono:telefono,
                correo_electronico:correo,
                id_tipo_sangre:tiposangre,
                fecha_nacimiento:fn
            }, (error, results)=>{

            if(error){
                console.log(error);
            } else{
                res.redirect('/');
            }
        })
    }

    if(btn_actualizar){
        conectar.query('UPDATE estudiantes SET ? WHERE id_estudiante = ?', [{
                carne:carne,
                nombres:nombres,
                apellidos:apellidos,
                direccion:direccion,
                telefono:telefono,
                correo_electronico:correo,
                id_tipo_sangre:tiposangre,
                fecha_nacimiento:fn
            }, id], (error, results)=>{

            if(error){
                console.log(error);
            } else{
                res.redirect('/');
            }
        })
    }

    if(btn_borrar){
        conectar.query('DELETE FROM estudiantes WHERE id_estudiante = ?', id, (error, results)=>{
            if(error){
                console.log(error);
            } else{
                res.redirect('/');
            }
        })
    }

};

export {crud_estudiante}