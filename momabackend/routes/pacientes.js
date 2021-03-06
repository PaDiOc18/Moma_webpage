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
router.use(bodyParser.urlencoded({extended: true}))

function convert_date_good_looking(ugly_date){
    return ugly_date.toISOString().split('T')[0];
}

//req.body para metodos POST y req.query para metodo GET

router.post('/agregar',(req,res) => {
    const {paciente, prehistorial, direccion} = req.body;

    let idInsertado = 0;

    //Cambiar a cadena el array
    let cadenaEnfermedades = prehistorial.enfTenidas.toString();

    connection.beginTransaction((err) => {
        if(err){ 
            res.send('Error en la transaccion');
        }
        
        const informacion_paciente = "insert into paciente values(NULL,'"+paciente.nombre+"','"+
        paciente.apellidop+"','"+paciente.apellidom+"','"+paciente.fechanac+"','"+paciente.sexo+"','"+
        paciente.estadocivil+"','"+paciente.telefono+"','"+paciente.correo+"','"+paciente.nacionalidad+"','"
        +paciente.observaciones+"','"+ new Date().toISOString().split('T')[0]+"');";

        connection.query(informacion_paciente, (err, results) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }
            else{
                idInsertado = results.insertId;
            }

        const informacion_direccion = "insert into direccion values('"+direccion.calle+"','"+
        direccion.numext+"','"+direccion.colonia+"','"+direccion.cp+"','"+direccion.municipio+"','"+
        direccion.estado+"',"+idInsertado+");";

        connection.query(informacion_direccion, (err,result) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }

        const informacion_prehistorial = "insert into prehistorial values('"+prehistorial.hospitalPorque+"','"+
        prehistorial.hospitalDonde+"','"+prehistorial.AtenMediPorque+"','"+prehistorial.AtenMediDonde+"','"+prehistorial.medicAler+"','"+
        cadenaEnfermedades+"','"+prehistorial.OtraEnfTenidas+"','"+prehistorial.medTomadasActu+"','"+prehistorial.ultimaConsulta+"','"
        +prehistorial.motivoConsulta+"',"+idInsertado+");";

        connection.query(informacion_prehistorial, (err,result) => {
            if(err){
                connection.rollback( () => {
                    res.send(err);
                });
            }
        connection.commit((err) => {
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

router.post('/modificar',(req,res)=>{
    const {paciente, prehistorial, direccion} = req.body;


    console.log(req.body.paciente)

    connection.beginTransaction((err) => {
        if(err){
            res.send('Hubo un error en la transaccion');
        }

        const modificar_paciente = "update paciente set nombre='" + paciente.nombre + "', " +
        "apellidop='" + paciente.apellidop +"', " +
        "apellidom='" + paciente.apellidom +"', " +
        "fechanac='" + paciente.fechanac.split('T')[0] +"', " +
        "sexo='" + paciente.sexo +"', " +
        "estadocivil='" + paciente.estadocivil +"', " +
        "telefono='" + paciente.telefono +"', " +
        "correo='" + paciente.correo +"', " +
        "nacionalidad='" + paciente.nacionalidad +"', " +
        "observaciones='" + paciente.observaciones +"' " +
        "where idpaciente=" + paciente.idpaciente + ";";

        const modificar_direccion = "update direccion set calle='" + direccion.calle + "'," +
        "numext=" + direccion.numext + ", " +
        "colonia='" + direccion.colonia + "', " +
        "cp=" + direccion.cp + ", " +
        "municipio='" + direccion.municipio + "', " +
        "estado='" + direccion.estado + "' " +
        "where id_paciente=" + paciente.idpaciente + ";";

        let cadenaEnfermedades = prehistorial.enfTenidas.toString();

        const modificar_prehistorial = "update prehistorial set hospitalPorque='" + prehistorial.hospitalPorque + "'," +
        "hospitalDonde='" + prehistorial.hospitalDonde + "', " +
        "AtenMediPorque='" + prehistorial.AtenMediPorque + "', " +
        "AtenMediDonde='" + prehistorial.AtenMediDonde + "', " +
        "medicAler='" + prehistorial.medicAler + "', " +
        "enfTenidas='" + cadenaEnfermedades + "', " +
        "OtraEnfTenidas='" + prehistorial.OtraEnfTenidas + "', " +
        "medTomadasActu='" + prehistorial.medTomadasActu + "', " +
        "ultimaConsulta='" + prehistorial.ultimaConsulta + "', " +
        "motivoConsulta='" + prehistorial.motivoConsulta + "' " +
        "where id_paciente=" + paciente.idpaciente + ";";

        connection.query(modificar_paciente, (err,results) =>{
            if(err){
                connection.rollback(() => {
                    res.send(err);
                });
            }

        connection.query(modificar_direccion, (err,results) => {
            if(err){
                connection.rollback(() => {
                    res.send(err);
                });
            }

        connection.query(modificar_prehistorial, (err,results) =>{
            if(err){
                connection.rollback(() => {
                    res.send(err);
                });
            }
        connection.commit((err) => {
            if(err){
                connection.rollback(() => {
                    res.send('Error en el commit');
                });
            }
            res.send('Informacion modificada con exito');
        });
        });
        });
        });
    });
});

router.delete('/eliminar', (req, res) => {
    const { idpaciente } = req.body;

    if(idpaciente == null || idpaciente == undefined){
        res.send('ID de paciente nulo')
    }
    else{
        const eliminar = 'delete from paciente where idpaciente= ' + idpaciente + ';';
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

router.get('/buscar',(req,res)=>{
        const { idpaciente } = req.query;
        const consultapaciente = 'select * from paciente where idpaciente = ' + idpaciente + ';';
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

router.get('/todainformacionpaciente', (req, res) => {
    const { idpaciente } = req.query;
    connection.query("select * from paciente inner join direccion on paciente.idpaciente = direccion.id_paciente inner join " 
        + "prehistorial on paciente.idpaciente = prehistorial.id_paciente "
        + "where paciente.idpaciente = " + idpaciente + ";" ,(err, result) =>{
        if(err){
            res.send(err);
        }
        else{
            result[0].fechanac = convert_date_good_looking(result[0].fechanac)
            result[0].ultimaConsulta = convert_date_good_looking(result[0].ultimaConsulta)
            result[0].fechaAltaPaciente = convert_date_good_looking(result[0].fechaAltaPaciente)
            result[0].enfTenidas = result[0].enfTenidas.split(',');

            res.json({
                 paciente: {
                    nombre: result[0].nombre, 
                    apellidop: result[0].apellidop,
                    apellidom: result[0].apellidom,
                    fechanac: result[0].fechanac,
                    sexo: result[0].sexo,
                    estadocivil: result[0].estadocivil,
                    telefono: result[0].telefono,
                    correo: result[0].correo,
                    nacionalidad: result[0].nacionalidad,
                    observaciones: result[0].observaciones,
                    idpaciente: result[0].idpaciente
                  },
                  direccion: {
                    calle: result[0].calle,
                    numext: result[0].numext,
                    colonia: result[0].colonia,
                    cp: result[0].cp,
                    municipio: result[0].municipio,
                    estado: result[0].estado,
                  },
                  prehistorial:{
                    hospitalPorque: result[0].hospitalPorque,
                    hospitalDonde: result[0].hospitalDonde,
                    AtenMediPorque: result[0].AtenMediPorque,
                    AtenMediDonde: result[0].AtenMediDonde,
                    medicAler: result[0].medicAler,
                    enfTenidas: result[0].enfTenidas,
                    OtraEnfTenidas: result[0].OtraEnfTenidas,
                    medTomadasActu: result[0].medTomadasActu,
                    ultimaConsulta: result[0].ultimaConsulta,
                    motivoConsulta: result[0].motivoConsulta
                  }
            });
        }
    });
});

router.get('/',(req,res) => {
    connection.query('select * from paciente', (err,results) => {
        if(err){
            return res.send(err);
        }
        else{
            for (let i = 0; i < results.length; i++) {
                results[i].fechanac = convert_date_good_looking(results[i].fechanac)
                results[i].fechaAltaPaciente = convert_date_good_looking(results[i].fechaAltaPaciente)
            }
            return res.json({
                pacientes: results
            })
        }
    });
});

router.post('/consultapaciente', (req, res) => {
    const { tipopeticion, datospost } = req.body;

    //Peticion de busqueda nombre y apellidos
    if(tipopeticion == 1){ 
        if(datospost.nombre == null || datospost.apellido == null){
            res.send('Nombre o Apellido vacios')
        }
        else{
            const consulta_nombre_apellido = "select * from paciente where nombre = '" + datospost.nombre + "' and apellidop = '" + datospost.apellido + "';";
            connection.query(consulta_nombre_apellido, (err,results) => {
                if(err){
                    res.send(err);
                }
                else{
                    for (let i = 0; i < results.length; i++) {
                        results[i].fechanac = convert_date_good_looking(results[i].fechanac)
                        results[i].fechaAltaPaciente = convert_date_good_looking(results[i].fechaAltaPaciente)
                    }
                    res.json({
                        pacientes: results
                    })
                }
            });
        }
    }

    //Peticion de busqueda id
    else if(tipopeticion == 2){ 
        if(datospost.id == null){
            res.send('ID vacio')
        }
        else{
            const consulta_idpaciente = "select * from paciente where idpaciente =" + datospost.id + ";";
            connection.query(consulta_idpaciente, (err,result) => {
                if(err){
                    res.send(err);
                }
                else{
                    for (let i = 0; i < result.length; i++) {
                        result[i].fechanac = convert_date_good_looking(result[i].fechanac)
                        result[i].fechaAltaPaciente = convert_date_good_looking(result[i].fechaAltaPaciente)
                    }
                    res.json({
                        pacientes: result
                    });
                }
            });
        }
    }

    //Peticion de busqueda entre fechas
    else if(tipopeticion == 3){ 
        if(datospost.fechaInicio == null || datospost.fechaFinal == null){
            res.send('fechaInicio o fechaFinal vacios')
        }
        else{
            const consulta_entre_fechas = "select * from paciente where fechaAltaPaciente between '" + datospost.fechaInicio + "' and '" + datospost.fechaFinal + "';";
            connection.query(consulta_entre_fechas, (err,results) => {
                if(err){
                    res.send(err);
                }
                else{
                    for (let i = 0; i < results.length; i++) {
                        results[i].fechanac = convert_date_good_looking(results[i].fechanac)
                        results[i].fechaAltaPaciente = convert_date_good_looking(results[i].fechaAltaPaciente)
                    }
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

module.exports = router;