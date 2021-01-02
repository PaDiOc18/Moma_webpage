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

router.post('/',(req,res) => {

	const get_citas = "select * from cita;";
	
	/*const infoprueba = [
	{
	    Id: 1,
	    Subject: 'Explosion of Betelgeuse Star',
	    StartTime: new Date(2018, 1, 15, 9, 30),
	    EndTime: new Date(2018, 1, 15, 11, 0)
	}, 
	{
	    Id: 2,
	    Subject: 'Thule Air Crash Report',
	    StartTime: new Date(2018, 1, 12, 12, 0),
	    EndTime: new Date(2018, 1, 12, 14, 0)
	}, {
	    Id: 3,
	    Subject: 'Blue Moon Eclipse',
	    StartTime: new Date(2018, 1, 13, 9, 30),
	    EndTime: new Date(2018, 1, 13, 11, 0)
	}, {
	    Id: 4,
	    Subject: 'Meteor Showers in 2018',
	    StartTime: new Date(2018, 1, 14, 13, 0),
	    EndTime: new Date(2018, 1, 14, 14, 30)
	}];*/
	connection.query(get_citas, (err,results) => {
        if (err) {
            return res.send(err);
        }
        else{
        	//res.send(results)
        	res.send(results)
            /*return res.json({
            	results
            })*/
        }
    })
	///res.send(infoprueba)
	//res.json(infoprueba);
});

function get_date_hour(ugly_date){
	let temp = ugly_date.split('T')
	return [temp[0],temp[1].split('.')[0]];
}

router.post('/prueba',(req,res) => {
	const {added,deleted,changed} = req.body
	//console.log(req.body);
	let fechainicio, fechafin = ''
	console.log(req.body)
		
	if(req.body.added[0] != undefined || req.body.added[0] != null){
		/*
		if(added[0].StartTime != null && added[0].EndTime != null){
			fechainicio = get_date_hour(added[0].StartTime) 
			fechafin = get_date_hour(added[0].EndTime) 
		}

		const insert = "insert into cita values(NULL,"+added[0].idpaciente+
		",'"+fechainicio[0]+" "+fechainicio[1]+"','"+fechafin[0]+" "+fechafin[1]+"','"+added[0].Description+"',"+added[0].Asistio+",'"+'Subject'+"');";
		

		connection.query(insert, (err,result) => {
			if(err){
				res.send(err)
			}
			else{
				res.send(result)
			}
		});*/
	}

	else if(req.body.deleted[0] != undefined || req.body.deleted[0] != null){

		const remove = "delete from cita where idpaciente= "+ deleted[0].idpaciente + ";";
		
		connection.query(remove, (err,result) => {
			if(err){
				console.log(err)
				res.send(err)
			}
			else{
				res.send(result)
			}
		});
	}

	else if(req.body.changed[0] != undefined || req.body.changed[0] != null){

		if(added[0].StartTime != null && added[0].EndTime != null){
			fechainicio = get_date_hour(added[0].StartTime) 
			fechafin = get_date_hour(added[0].EndTime) 
		}

		const modify = "insert into cita values(NULL,"+added[0].idpaciente+
		","+fechainicio[0]+" "+fechainicio[1]+","+fechafin[0]+" "+fechafin[1]+","+added[0].Description+","+added[0].Asistio+");";
		
		connection.query(insert, (err,result) => {
			if(err){

			}
			else{
				res.send('Agregado existosamente')
			}
		});
	}

	else{
		console.log('Fallo en el sistema');
	}
});


module.exports = router;