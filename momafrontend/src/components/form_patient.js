import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class formularioPaciente extends Component {

    state = {
      paciente: {
        nombre: '', 
        apellidop: '',
        apellidom: '',
        fechanac: '',
        sexo: '',
        estadocivil: '',
        telefono: '',
        correo: '',
        nacionalidad: '',
        observaciones: ''
      },
      direccion: {
        calle: '',
        numext: '',
        colonia: '',
        cp: '',
        municipio: '',
        estado: '',
      },
      prehistorial:{
        hospitalPorque: '',
        hospitalDonde: '',
        AtenMediPorque: '',
        AtenMediDonde: '',
        medicAler: '',
        enfTenidas: [],
        OtraEnfTenidas: '',
        medTomadasActu: '',
        ultimaConsulta: '',
        motivoConsulta: ''
      },
      action: 'add'
    }

    componentDidMount(){
      if(this.props.datosEnviados !== undefined){
        this.show_notnull_inputs(this.props.datosEnviados);
        this.setState({
          paciente:{
            ...this.props.datosEnviados
          },
          direccion:{
            ...this.props.datosEnviados
          },
          prehistorial:{
            ...this.props.datosEnviados
          }
          }, () => {
            this.select_checkboxes();
        });
      } 
    }

    select_checkboxes = () =>{
      const { enfTenidas } = this.state.prehistorial;
      for(let j=0; j < enfTenidas.length; j++){
        for(let i=1; i <= 16; i++){
          if(enfTenidas[j] === document.getElementById('enfTenidasCB' + i).value){
            document.getElementById('enfTenidasCB' + i).checked = true;
            break;
          }
        }
      }
    }

    send_data_to_parent = (e) => {
      e.preventDefault()
      this.props.send_data_from_child(this.state)
    }

    update_action = (action_updated) =>{
      this.setState({action: action_updated })
    }

    add_remove_diseases = e => {
        const { prehistorial } = this.state;
        if(e.target.checked){
            prehistorial.enfTenidas.push(e.target.value)
        }
        else{
            let indice = prehistorial.enfTenidas.indexOf(e.target.value)
            prehistorial.enfTenidas.pop(indice)
        }
        this.setState(prehistorial)
    }
  
    show_hide_inputs = (valor,id1,id2) => {
      if(valor === 'Si' ){
        if(id2 !== null){document.getElementById(id2).style.display = '';}
        document.getElementById(id1).style.display = '';
      }
      else{
        if(id2 !== null){document.getElementById(id2).style.display = 'none';}
        document.getElementById(id1).style.display = 'none';
      }
    }

    show_notnull_inputs = (datos) =>{
      if(datos.hospitalPorque !== '' && datos.hospitalDonde !== ''){
        document.getElementsByName('HospitalizadoRN')[0].checked = true;
        document.getElementById('PorqueHospitalizadoID').style.display = '';
        document.getElementById('DondeHospitalizadoID').style.display = '';
      }
      else{document.getElementsByName('HospitalizadoRN')[1].checked = true;}

      if(datos.AtenMediPorque !== '' && datos.AtenMediDonde !== ''){ 
        document.getElementsByName('AtencionMedicaRN')[0].checked = true;
        document.getElementById('AtenMediPorqueID').style.display = '';
        document.getElementById('AtenMediDondeID').style.display = '';
      }
      else{document.getElementsByName('AtencionMedicaRN')[1].checked = true;}

      if(datos.medicAler !== ''){
        document.getElementsByName('medicAlerRN')[0].checked = true;
        document.getElementById('medicAler').style.display = '';
      }
      else{document.getElementsByName('medicAlerRN')[1].checked = true;}

      if(datos.OtraEnfTenidas !== ''){
        document.getElementsByName('OtraEnfTenidasRN')[0].checked = true;
        document.getElementById('OtraEnfTenidasID').style.display = '';  
      }
      else{document.getElementsByName('OtraEnfTenidasRN')[1].checked = true;}

      if(datos.medTomadasActu !== ''){
        document.getElementsByName('medTomadasActuRN')[0].checked = true;
        document.getElementById('medTomadasActuID').style.display = '';
      }
      else{document.getElementsByName('medTomadasActuRN')[1].checked = true;}
    }

    render() {
      const { paciente, prehistorial, direccion} = this.state;
      return (
        <Fragment>
          <form autoComplete="off" onSubmit={this.send_data_to_parent} style={{margin: '2rem'}}>
            <h4 className="text-center">Datos del Paciente</h4>
            <div className="form-row">
              <div className="form-group col-md">
                <label htmlFor="nombrePaciente">Nombre</label>
                <input value={this.state.paciente.nombre} type="text" maxLength={50} className="form-control" id="nombrePaciente" placeholder="Nombre"
                onChange={e => this.setState({paciente: {...paciente, nombre: e.target.value}})} required/>
              </div>
              <div className="form-group col-md">
                <label htmlFor="apPaciente">Apellido Paterno</label>
                <input value={this.state.paciente.apellidop} type="text" maxLength={50} className="form-control" id="apPaciente" placeholder="Apellido Paterno"
                onChange={ e => this.setState({ paciente: {...paciente, apellidop: e.target.value}})} required/>
              </div>
              <div className="form-group col-md">
                <label htmlFor="amPaciente">Apellido Materno</label>
                <input value={this.state.paciente.apellidom} type="text" maxLength={50} className="form-control" id="amPaciente" placeholder="Apellido Materno"
                onChange={e => this.setState({ paciente: {...paciente, apellidom: e.target.value }})} required/>
              </div>
            </div>
          
            <div className="form-row">
              <div className="form-group col-md">
                <label htmlFor="fechanac">Fecha de Nacimiento</label><br></br>
                <input type='date' value={this.state.paciente.fechanac} className='form-control' id='fechanac' onChange= {e => this.setState({ paciente: { ...paciente, fechanac: e.target.value}})} required/>
              </div>
              <div className="form-group col-md">
                <label htmlFor="sexo">Sexo</label>
                <select value={this.state.paciente.sexo}  id="sexo" className="form-control"
                onChange={e => this.setState({ paciente: {...paciente, sexo: e.target.value}})} required>
                  <option value="default">Selecciona una Opcion</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div className="form-group col-md">
                <label htmlFor="estadocivil">Estado Civil</label>
                <select value={this.state.paciente.estadocivil} id="estadocivil" className="form-control"
                onChange={e => this.setState({ paciente: {...paciente, estadocivil: e.target.value}})} required>
                  <option value="default">Selecciona una Opcion</option>
                  <option value="Soltero">Soltero/a</option>
                  <option value="Casado">Casado/a</option>
                  <option value="Union libre">Unión libre</option>
                  <option value="Separado">Separado/a</option>
                  <option value="Divorciado">Divorciado/a</option>
                  <option value="Viudo">Viudo/a</option>
                </select>
              </div>
            </div>
            <div className='form-row'>
              <div className="form-group col-md-4">
                <label htmlFor="telefono">Teléfono</label>
                <input value={this.state.paciente.telefono} type="text" maxLength={15} className="form-control" id="telefono" placeholder="Teléfono"
                onChange={e => this.setState({ paciente: {...paciente, telefono: e.target.value }})} pattern="[0-9]+" title="Solo valores numericos" required/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="correo">Correo</label>
                <input value={this.state.paciente.correo} type="email" maxLength={50} className="form-control" id="correo" placeholder="Correo"
                onChange={e => this.setState({ paciente: {...paciente, correo: e.target.value }})} required/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="nacionalidad">Nacionalidad</label>
                <input value={this.state.paciente.nacionalidad} type="text" maxLength={35} className="form-control" id="nacionalidad" placeholder="Nacionalidad"
                onChange={e => this.setState({ paciente: {...paciente, nacionalidad: e.target.value }})} required/>
              </div>
            </div>

            <hr className="my-4"></hr>

            <h4 className="text-center">Dirección</h4>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="calle">Calle</label>
                <input value={this.state.direccion.calle} type="text" maxLength={50} className="form-control" id="calle" placeholder="Calle"
                onChange={e => this.setState({ direccion: {...direccion, calle: e.target.value }})} required/>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="numExt">Num Ext</label>
                <input value={this.state.direccion.numext} type="text" maxLength={7} className="form-control" id="numExt" placeholder="Número Exterior"
                onChange={e => this.setState({ direccion: {...direccion, numext: e.target.value }})} pattern="[0-9]+" title="Solo valores numericos" required/>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="colonia">Colonia</label>
                <input value={this.state.direccion.colonia} type="text" maxLength={50} className="form-control" id="colonia" placeholder="Colonia"
                onChange={e => this.setState({ direccion: {...direccion, colonia: e.target.value }})} required/>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="cp">C.P</label>
                <input value={this.state.direccion.cp} type="text" maxLength={7} className="form-control" id="cp" placeholder="Código Postal"
                onChange={e => this.setState({ direccion: {...direccion, cp: e.target.value }})} pattern="[0-9]+" title="Solo valores numericos" required/>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="municipio">Municipio</label>
                <input value={this.state.direccion.municipio} type="text" maxLength={40} className="form-control" id="municipio" placeholder="Municipio"
                onChange={e => this.setState({ direccion: {...direccion, municipio: e.target.value }})} required/>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="Estado">Estado</label>
                <input value={this.state.direccion.estado} type="text" maxLength={40} className="form-control" id="Estado" placeholder="Estado"
                onChange={e => this.setState({ direccion: {...direccion, estado: e.target.value }})} required/>
              </div>
            </div>

            <hr className="my-4"></hr>

            <h4 className="text-center">Historial Médico</h4>
            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Ha estado hospitalizado/a en estos ultimos dos años?</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="HospitalizadoRID" name="HospitalizadoRN" value='Si' onChange={ e => {this.show_hide_inputs(e.target.value,'PorqueHospitalizadoID','DondeHospitalizadoID')}} required/>
                <label className="custom-control-label" htmlFor="HospitalizadoRID">Si</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="Hospitalizado2RID" name="HospitalizadoRN" value='No' onChange={ e => {this.show_hide_inputs(e.target.value,'PorqueHospitalizadoID','DondeHospitalizadoID')}}/>
                <label className="custom-control-label" htmlFor="Hospitalizado2RID">No</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
              <textarea value={this.state.prehistorial.hospitalPorque} type="text" maxLength="120" className="form-control" id="PorqueHospitalizadoID" placeholder="Escriba el porque"
              onChange={e => this.setState({ prehistorial: {...prehistorial, hospitalPorque: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>
            <div className='form-group'>
              <div className="form-group mt-2">
              <input value={this.state.prehistorial.hospitalDonde} type="text" maxLength="50" className="form-control" id="DondeHospitalizadoID" placeholder="Escriba donde"
              onChange={e => this.setState({ prehistorial: {...prehistorial, hospitalDonde: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Ha estado bajo atención médica en estos ultimos dos años?</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="AtencionMedicaRID" name="AtencionMedicaRN"  value='Si' onChange={ e => {this.show_hide_inputs(e.target.value,'AtenMediPorqueID','AtenMediDondeID')}} required/>
                <label className="custom-control-label" htmlFor="AtencionMedicaRID">Si</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="AtencionMedica2RID" name="AtencionMedicaRN"  value='No' onChange={ e => {this.show_hide_inputs(e.target.value,'AtenMediPorqueID','AtenMediDondeID')}}/>
                <label className="custom-control-label" htmlFor="AtencionMedica2RID">No</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
              <textarea value={this.state.prehistorial.AtenMediPorque} type="text" maxLength="120" className="form-control" id="AtenMediPorqueID" placeholder="Escriba el porque"
              onChange={e => this.setState({ prehistorial: {...prehistorial, AtenMediPorque: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>
            <div className='form-group'>
              <div className="form-group mt-2">
              <input value={this.state.prehistorial.AtenMediDonde} type="text" maxLength="50" className="form-control" id="AtenMediDondeID" placeholder="Escriba donde"
              onChange={e => this.setState({ prehistorial: {...prehistorial, AtenMediDonde: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Es alérgico a alguna droga, anestecia y/o  antibióticos?</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="medicAlerRID" name="medicAlerRN"  value='Si' onChange={ e => {this.show_hide_inputs(e.target.value,'medicAler',null)}} required/>
                <label className="custom-control-label" htmlFor="medicAlerRID">Si</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="medicAler2RID" name="medicAlerRN"  value='No' onChange={ e => {this.show_hide_inputs(e.target.value,'medicAler',null)}}/>
                <label className="custom-control-label" htmlFor="medicAler2RID">No</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
              <textarea value={this.state.prehistorial.medicAler} type="text" maxLength="120" className="form-control" id="medicAler" placeholder="Escriba cuales"
              onChange={e => this.setState({ prehistorial: {...prehistorial, medicAler: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2 pb-2">
                <label className="form-control-plainte">Si ha tenido alguna de estas enfermedades márquela: </label>
              </div>
            </div>

            
            <div className='list-group pb-2 pt-2'>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB1"  value="Cardiopatia" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB1">Cardiopatía</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB2" value="Fiebre Reumatica" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB2">Fiebre Reumática</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB3" value="Artritis" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB3">Artritis</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB4" value="Tuberculosis" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB4">Tuberculosis</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB5" value="Anemia" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB5">Anemia</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB6" value="Epilepsia" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB6">Epilepsia</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB7" value="Lesiones Cardiacas" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB7">Lesiones Cardiacas</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB8" value="Tratamiento psiquico" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB8">Tratamiento psiquico</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB9" value="Marcapasos" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB9">Marcapasos</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB10" value="Hepatitis" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB10">Hepatitis</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB11" value="Tratamiento oncologico" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB11">Tratamiento oncológico</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB12" value="Hipertension arterial" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB12">Hipertensión arterial</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB13" value="Diabetes" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB13">Diabetes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB14" value="Apoplejia" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB14">Apoplejía</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB15" value="Accidentes Vasculares" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB15">Accidentes Vasculares</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="enfTenidasCB16" value="Perdida de peso" onChange={this.add_remove_diseases}/>
                <label className="form-check-label" htmlFor="enfTenidasCB16">Pérdida de peso</label>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Ha tenido alguna otra enfermedad?</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="OtraEnfTenidasRID" name="OtraEnfTenidasRN"  value='Si' onChange={ e => {this.show_hide_inputs(e.target.value,'OtraEnfTenidasID',null)}} required/>
                <label className="custom-control-label" htmlFor="OtraEnfTenidasRID">Si</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="OtraEnfTenidas2RID" name="OtraEnfTenidasRN"  value='No' onChange={ e => {this.show_hide_inputs(e.target.value,'OtraEnfTenidasID',null)}}/>
                <label className="custom-control-label" htmlFor="OtraEnfTenidas2RID">No</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
              <textarea value={this.state.prehistorial.OtraEnfTenidas} type="text" maxLength="120" className="form-control" id="OtraEnfTenidasID" placeholder="Escriba cuales"
              onChange={e => this.setState({ prehistorial: {...prehistorial, OtraEnfTenidas: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Está tomando alguna medicación actualmente?</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="medTomadasActuRID" name="medTomadasActuRN"  value='Si' onChange={ e => {this.show_hide_inputs(e.target.value,'medTomadasActuID',null)}} required/>
                <label className="custom-control-label" htmlFor="medTomadasActuRID">Si</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="medTomadasActu2RID" name="medTomadasActuRN"  value='No' onChange={ e => {this.show_hide_inputs(e.target.value,'medTomadasActuID',null)}}/>
                <label className="custom-control-label" htmlFor="medTomadasActu2RID">No</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
              <textarea value={this.state.prehistorial.medTomadasActu} type="text" maxLength="120" className="form-control" id="medTomadasActuID" placeholder="Escriba cuales"
              onChange={e => this.setState({ prehistorial: {...prehistorial, medTomadasActu: e.target.value }})} style={{display: 'none'}}/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Cuándo fue su última consulta dental?</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
                <input value={this.state.prehistorial.ultimaConsulta} type='date' className='form-control' id='ultimaConsulta' onChange= {e => this.setState({ prehistorial: { ...prehistorial, ultimaConsulta: e.target.value}})} required/>
              </div>
            </div>

            <div className='form-row'>
              <div className="form-inline pr-2">
                <label className="form-control-plainte">¿Cuál es el motivo de la consulta?</label>
              </div>
            </div>

            <div className='form-group'>
              <div className="form-group mt-2">
                <textarea value={this.state.prehistorial.motivoConsulta} type="text" maxLength="120" className="form-control" id="motivoConsultaID" placeholder="Motivos"
                onChange={e => this.setState({ prehistorial: {...prehistorial, motivoConsulta: e.target.value }})} required/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea value={this.state.paciente.observaciones} type="text" maxLength="120" className="form-control" id="observaciones" placeholder="Observaciones"
              onChange={e => this.setState({ paciente: {...paciente, observaciones: e.target.value }})}/>
            </div>

            <div className='row'>
              { this.props.functionality === 'add'
              ? <Fragment><div className='col'><button type="submit" style={{float: 'right'}} className="btn btn-success">Agregar Paciente</button></div></Fragment>
              : <Fragment><div className='col'><button id='modify' type="submit" onClick={ e => this.update_action(e.target.id)} className="btn btn-warning">Guardar Cambios</button></div>
                <div className='col'><button id='erase' type="submit" onClick={e => this.update_action(e.target.id)} className="btn btn-danger">Eliminar Paciente</button></div></Fragment>
              }
            </div>
          </form>
        </Fragment>
      )
    }
}

export default formularioPaciente;