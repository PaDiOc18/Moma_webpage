import React, { Component, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import './css/material.css';
import {DataManager,UrlAdaptor } from "@syncfusion/ej2-data";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Modal from 'react-bootstrap/Modal';
import PageSearch from '../pages/search_patient';

function convert_date(current_datetime){ 
    let fecha = current_datetime.getMonth() + 1
    if (fecha < 10){ 
        fecha = '0' + (fecha); 
    }
    let formatted_date = current_datetime.getFullYear() + "-" + fecha  + "-" + current_datetime.getDate();
    console.log( 'date ' + formatted_date)
    return formatted_date;
}
function convert_time(current_datetime){ 
    let fecha = current_datetime.getMinutes()
    if (fecha < 10){ 
        fecha = '0' + (fecha); 
    }
    let formatted_date = current_datetime.getHours() + ":" + fecha  + ":00" ;
    console.log('time ' + formatted_date)
    return formatted_date;
}
class Scheduler extends Component {
    state = {
        showModal: false,
        idpaciente: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        trabajo: ''
    }

    constructor(){
        super(...arguments);
        this.data = new DataManager({
            url: 'http://localhost:4000/consultas/',
            crudUrl: 'http://localhost:4000/consultas/prueba',
            crossDomain: true,
            adaptor: new UrlAdaptor
        })
    }

    onActionBegin(args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
          let data = args.data instanceof Array ? args.data[0] : args.data;
          if (!this.scheduleObj.isSlotAvailable(data.StartTime, data.EndTime)) {
            args.cancel = true;
          }
          console.log(args)
        }
    }

    onPopupOpen(args) {
        if(args.type === 'QuickInfo') {
          var dialogObj = args.element.ej2_instances[0];
          dialogObj.hide();
          var currentAction = args.target.classList.contains('e-work-cells') ? 'Add' : 'Save';
          this.scheduleObj.openEditor(args.data, currentAction);
        }
    }
    
    get_id = (id) =>{
        this.setState({
            idpaciente: id,
            showModal: false
        })
    }

    editorTemplate(props) {
        if(props !== undefined){
return <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
<tr><td className="e-textlabel">Paciente</td><td style={{ colspan: '4' }}>
    <input value={this.state.idpaciente} autoComplete='off' pattern="[0-9]+" id="Summary" className="e-field e-input" type="text" name="idpaciente"/>
    <button style={{float:'right'}} variant="primary" className='mb-2 p-1' onClick={() => this.setState({showModal: true})}>Buscar</button>
</td></tr>
<tr><td className="e-textlabel">Inicio</td><td style={{ colspan: '4' }}>
    <DateTimePickerComponent id="StartTime" format={{skeleton:'medium'}} data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
</td></tr>
<tr><td className="e-textlabel">Fin</td><td style={{ colspan: '4' }}>
    <DateTimePickerComponent id="EndTime" format={{skeleton:'medium'}} data-name="EndTime" value={new Date(props.endTime || props.EndTime)}  className="e-field"></DateTimePickerComponent>
</td></tr>
<tr><td className="e-textlabel">Inicio</td><td style={{ colspan: '4' }}>
<input type='date' className='form-control'  value={this.state.dateStart} className="e-field" name='fechaxample'/>
</td></tr>
<tr><td className="e-textlabel">Trabajo</td><td style={{ colspan: '4' }}>
    <textarea id="Description" value={'hola'} onChange={(e)=>this.setState({trabajo: e.target.value})} className="e-field e-input" name="Description"  rows={2} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
</td></tr>
<tr><td className="e-textlabel">Asistio?</td><td style={{ colspan: '4' }}>
    <select className='form-control e-field p-1' name='Asistio' data-name="Asistio">
        <option value="default" selected>Selecciona una opcion</option>
        <option value="false">No asistio</option>
        <option value="true">Asistio</option>
    </select>
</td></tr>
</tbody></table>
        }
        else{
            console.log('EDIT')
            return <div></div>
        }
    }

    render() {
        return (
            <div>                
                <ScheduleComponent actionBegin={this.onActionBegin.bind(this)} editorTemplate={this.editorTemplate.bind(this)} popupOpen={this.onPopupOpen.bind(this)}  ref={t => this.scheduleObj = t} height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                    <Modal size="lg" show={this.state.showModal} onHide={() => this.setState({showModal: false})} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                        Selecciona un paciente
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PageSearch give_id={this.get_id}></PageSearch>
                    </Modal.Body>
                    </Modal>
                </ScheduleComponent>
            </div>
        )
    }
}

export default Scheduler;
