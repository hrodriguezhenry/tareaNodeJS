import { conectar } from "../models/db_conectar.js"
var crud_tipo_sangre = ({});

crud_tipo_sangre.leer = (req, res) => {
    const tiposSangre = `
        SELECT ts.sangre
        FROM tipo_sangre AS ts;`;

    conectar.query(tiposSangre, (error, tipoSangreResults) => {
        if (error) {
            throw error;
        } else {
            res.render('colegio/tipo_sangre', {
                tiposSangre: tipoSangreResults
            });
        }
    });
};


crud_tipo_sangre.cud = (req, res)=>{
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id = req.body.txt_id;
    const tiposangre = req.body.txt_tiposangre;

    if(btn_crear){
        conectar.query('INSERT INTO tipo_sangre SET ?', {
                sangre:tiposangre
            }, (error, results)=>{

            if(error){
                console.log(error);
            } else{
                res.redirect('/tipo_sangre');
            }
        })
    }

    if(btn_actualizar){
        conectar.query('UPDATE tipo_sangre SET ? WHERE id_tipo_sangre = ?', [{
                sangre:tiposangre
            }, id], (error, results)=>{

            if(error){
                console.log(error);
            } else{
                res.redirect('/tipo_sangre');
            }
        })
    }

    if(btn_borrar){
        conectar.query('DELETE FROM tipo_sangre WHERE id_tipo_sangre = ?', id, (error, results)=>{
            if(error){
                console.log(error);
            } else{
                res.redirect('/tipo_sangre');
            }
        })
    }

};

export {crud_tipo_sangre}