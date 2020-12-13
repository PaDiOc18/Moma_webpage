const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'moniUser',
    password: 'usuariomoni',
    database: 'monidb'
});

router.use(cors());
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//req.body para metodos POST y req.query para metodo GET

router.post('/agregar',(req,res) => {
    const {paciente, prehistorial, direccion} = req.body;
    let idInsertado = 0;
    connection.beginTransaction(function(err) {
        if(err){ res.send('Error en la transaccion'); } //Si falla algo en empezar la transacción, lanza error

        connection.query("insert into paciente values(NULL,'"+paciente.nombre+"','"+
        paciente.apellidop+"','"+paciente.apellidom+"','"+paciente.fechanac+"','"+paciente.sexo+"','"+
        paciente.estadocivil+"','"+paciente.telefono+"','"+paciente.correo+"','"+paciente.nacionalidad+"','"
        +paciente.observaciones+"','"+ new Date().toISOString().split('T')[0]+"');", (err, results) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }
            else{
                idInsertado = results.insertId;
            }

        connection.query("insert into direccion values('"+direccion.calle+"','"+
        direccion.numext+"','"+direccion.colonia+"','"+direccion.cp+"','"+direccion.municipio+"','"+
        direccion.estado+"',"+idInsertado+");", (err,result) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }

        //Cambiar a cadena el array
        let cadenaEnfermedades = prehistorial.enfTenidas.toString();

        connection.query("insert into prehistorial values('"+prehistorial.hospitalPorque+"','"+
        prehistorial.hospitalDonde+"','"+prehistorial.AtenMediPorque+"','"+prehistorial.AtenMediDonde+"','"+prehistorial.medicAler+"','"+
        cadenaEnfermedades+"','"+prehistorial.OtraEnfTenidas+"','"+prehistorial.medTomadasActu+"','"+prehistorial.ultimaConsulta+"','"
        +prehistorial.motivoConsulta+"',"+idInsertado+");", (err,result) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }
        connection.commit( (err) => {
            if(err){
                connection.rollback(() => {
                    res.send('Error en el commit');
                });
            }
            res.send('Paciente correctamente registrado');
        });
        });
        });
        });
    });
});

router.get('/',(req,res) => {
    connection.query('select * from paciente', (err,results) => {
        if(err){
            return res.send(err);
        }
        else{
            for (let i = 0; i < results.length; i++) {
                results[i].fechanac = results[i].fechanac.toISOString().split('T')[0];
                results[i].fechaAltaPaciente = results[i].fechaAltaPaciente.toISOString().split('T')[0];
            }
            return res.json({
                pacientes: results
            })
        }
    });
});

router.post('/consultapaciente', (req, res) => {
    const { tipopeticion, datospost } = req.body;
    if(tipopeticion == 1){ //Peticion de busqueda nombre y apellidos
        if(datospost.nombre == null || datospost.apellido == null){
            res.send('Nombre o Apellido vacios')
        }
        else{
            connection.query("select * from paciente where nombre = '" + datospost.nombre + "' and apellidop = '" + datospost.apellido + "';", (err,results) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.json({
                        pacientes: results
                    })
                }
            });
        }
    }
    else if(tipopeticion == 2){ //Peticion de busqueda id
        if(datospost.id == null){
            res.send('ID vacio')
        }
        else{
            connection.query("select * from paciente where idpaciente =" + datospost.id + ';' , (err,result) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.json({
                        pacientes: result
                    });
                }
            });
        }
    }
    else if(tipopeticion == 3){ //Peticion de busqueda entre fechas
        if(datospost.fechaInicio == null || datospost.fechaFinal == null){
            res.send('fechaInicio o fechaFinal vacios')
        }
        else{
            connection.query("select * from paciente where fechaAltaPaciente between '" + datospost.fechaInicio + "' and '" + datospost.fechaFinal + "';", (err,results) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.json({
                        pacientes: results
                    });
                }
            });
        }
    }
    else{
        res.send('Favor de seleccionar un tipo de busqueda');
    }
});

router.get('/todainformacionpaciente', (req, res) => {
    const { idpaciente } = req.query;
    connection.query("select * from paciente inner join direccion on paciente.idpaciente = direccion.id_paciente inner join " 
        + "prehistorial on paciente.idpaciente = prehistorial.id_paciente "
        + "where paciente.idpaciente = " + idpaciente + ";" ,(err, result) =>{
        if(err){
            res.send(err);
        }
        else{
            result[0].fechanac = result[0].fechanac.toISOString().split('T')[0];
            result[0].ultimaConsulta = result[0].ultimaConsulta.toISOString().split('T')[0];
            result[0].fechaAltaPaciente = result[0].fechaAltaPaciente.toISOString().split('T')[0];
            result[0].enfTenidas = result[0].enfTenidas.split(',');
            res.json({
                paciente: result
            });
        }
    });
});

router.get('/eliminarpaciente', (req, res) => {
    const { idpaciente } = req.query;
    if(idpaciente == null){
        res.send('ID de paciente nulo')
    }
    else{
        const eliminar = 'delete from clientes where idpaciente= ' + idpaciente + ';';
        connection.query(eliminar, (err,result) => {
            if(err){
                res.send(err)
            }
            else{
                res.send('El paciente ha sido eliminado con exito')
            }
        })
    }
});


router.post('/modificarpaciente',(req,res)=>{
        const modificar = "update clientes set nombre='" + req.body.paciente.nombre + "', " +
        "apellidop='" + req.body.paciente.apellidop +"', " +
        "apellidom='" + req.body.paciente.apellidom +"', " +
        "fechanac='" + req.body.paciente.fechanac.split('T')[0] +"', " +
        "sexo='" + req.body.paciente.sexo +"', " +
        "calle='" + req.body.paciente.calle +"', " +
        "numext='" + req.body.paciente.numext +"', " +
        "cp='" + req.body.paciente.cp +"', " +
        "municipio='" + req.body.paciente.municipio +"', " +
        "estado='" + req.body.paciente.estado +"', " +
        "telefono='" + req.body.paciente.telefono +"', " +
        "celular='" + req.body.paciente.celular +"', " +
        "correo='" + req.body.paciente.correo +"', " +
        "nacionalidad='" + req.body.paciente.nacionalidad +"', " +
        "medicaler='" + req.body.paciente.medicaler +"', " +
        "observaciones='" + req.body.paciente.observaciones +"' " +
        "where idpaciente=" + req.body.paciente.idpaciente + ";";

        connection.query(modificar, (err,result) => {
            if (err) {
                return res.send(err);
            }
            else{
                return res.send('Los datos se modificaron con exito');
            }
        })
});

router.get('/buscarpaciente',(req,res)=>{
        const { idpaciente } = req.query;
        const consultapaciente = 'select * from clientes where idpaciente = ' + idpaciente + ';';
        connection.query(consultapaciente, (err,result) => {
            if (err) {
                return res.send(err);
            }
            else{
                return res.json({
                   data: result
                })
            }
        })
});

module.exports = router;