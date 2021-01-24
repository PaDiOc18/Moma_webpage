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


function get_minutes(date){
	let minutes = date.getMinutes()

	if(minutes < 10)
		return '0' + minutes;
	else{
		return minutes;
	}
}

function get_hours(date){
	let hours = date.getHours()

	if(hours < 10)
		return '0' + hours;
	else{
		return hours;
	}
}

function get_seconds(date){
	let seconds = date.getSeconds()

	if(seconds < 10)
		return '0' + seconds;
	else{
		return seconds;
	}
}

function get_fullTime(hours,minutes,seconds){
	return hours + ':' + minutes + ':' + seconds;
}

function get_day(date){
	let day = date.getDate()

	if(day < 10)
		return '0' + day;
	else{
		return day;
	}
}

function get_month(date){
	let month = date.getMonth() + 1

	if(month < 10)
		return '0' + month;
	else{
		return month;
	}
}

function get_year(date){
	let year = date.getFullYear()
	return year;
}

function get_fullDate(day,month,year){
	return year + '-' + month + '-' + day;
}

router.post('/',(req,res) => {

	const get_citas = "select * from cita;";
	
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
});

router.post('/prueba',(req,res) => {
	const {added,deleted,changed} = req.body

	let fechainicio = null;
	let fechafinal = null;

	if(added != undefined || changed != undefined){

		if(added[0] != undefined && added[0] != null){ //Add an appointment
			
			if(added[0].StartTime != null && added[0].EndTime != null){
				fechainicio = new Date(added[0].StartTime)
				fechafinal = new Date(added[0].EndTime)
			}

			let fullStartDate = get_fullDate(get_day(fechainicio),get_month(fechainicio),get_year(fechainicio)) + ' ' + get_fullTime(get_hours(fechainicio),get_minutes(fechainicio),get_seconds(fechainicio))
			let fullEndDate = get_fullDate(get_day(fechafinal),get_month(fechafinal),get_year(fechafinal)) + ' ' + get_fullTime(get_hours(fechafinal),get_minutes(fechafinal),get_seconds(fechafinal))

			const insert = "insert into cita values(NULL,"+added[0].idpaciente+
			",'" + fullStartDate + "','"+ fullEndDate +"','"+added[0].Description+"',"+added[0].Asistio+",'"+added[0].Subject+"');";
			
			connection.query(insert, (err,result) => {
				if(err){
					console.log(err)
					res.send(err)
				}
				else{
					console.log(result)
					res.send(result)
				}
			});
		}

		else if(changed[0] != undefined && changed[0] != null){ //Update an appointment
				
				if(changed[0].StartTime != null && changed[0].EndTime != null){
					fechainicio = new Date(changed[0].StartTime)
					fechafinal = new Date(changed[0].EndTime)
				}


				let fullStartDate = get_fullDate(get_day(fechainicio),get_month(fechainicio),get_year(fechainicio)) + ' ' + get_fullTime(get_hours(fechainicio),get_minutes(fechainicio),get_seconds(fechainicio))
				let fullEndDate = get_fullDate(get_day(fechafinal),get_month(fechafinal),get_year(fechafinal)) + ' ' + get_fullTime(get_hours(fechafinal),get_minutes(fechafinal),get_seconds(fechafinal))

				
				const modify = "update cita set idpaciente="+changed[0].idpaciente+
				",StartTime='"+ fullStartDate +"',EndTime='"+ fullEndDate +"',Description='"+
				changed[0].Description+"',Asistio="+changed[0].Asistio+ ", Subject= '"+ changed[0].Subject +"' where Id=" + changed[0].Id + ";";
				
				connection.query(modify, (err,result) => {
					if(err){
						console.log(err)
						res.send(err)
					}
					else{
						res.send(result)
					}
				});
		}

		else{
			console.log('Fallo en el sistema');
		}
	}

	else if(req.body.action == 'remove'){
		if(req.body.key != null && req.body.key != undefined){
			const remove = "delete from cita where Id= "+ req.body.key + ";";
			
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
	}

	else{
		console.log('Option doesnt founded')
	}


});


module.exports = router;