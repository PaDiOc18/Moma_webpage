import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import './css/material.css';
import { DataManager,UrlAdaptor } from "@syncfusion/ej2-data";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import PageSearch from '../pages/search_patient';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
  
class Scheduler extends Component {
    constructor(){
        super(...arguments);
        this.hideDialog = false;
        this.temp = null;

        this.dlgButtons = [
            { click: this.dlgDeleteClick.bind(this), buttonModel: { content: 'Eliminar', cssClass: "e-delete", isPrimary: true } }, 
            { click: this.dlgalertClick.bind(this), buttonModel: { content: 'Alerta', isPrimary: true } }, 
            { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Guardar', isPrimary: true } }, 
            { click: this.dlgBtnCancel.bind(this), buttonModel: { content: 'Cancelar', isPrimary: true } }
        ];
        
        this.animationSettings = { effect: 'FlipXUp' };

        this.data = new DataManager({
            url: 'http://localhost:4000/consultas/',
            crudUrl: 'http://localhost:4000/consultas/prueba',
            crossDomain: true,
            adaptor: new UrlAdaptor()
        })

        this.position = {
            X: 'center',
            Y: '30'
        }

        this.state = {
            showModal: false
        }

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.content = this.content.bind(this)
    }

    get_id = (paciente) =>{
        document.querySelector("#idpaciente").value = paciente.idpaciente;
        document.querySelector("#Subject").value = paciente.nombre + ' ' + paciente.apellidop + ' ' + paciente.apellidom;
        this.setState({showModal: false})
    }

    showModal() {
       this.setState({ showModal: true})
    }
    
    hideModal() {
        this.setState({ showModal: false})
    }
    
    content(data) {
        return (<table className="custom-event-editor" style={{ width: '100%', cellpadding: '4' }}><tbody>
        <tr><td className="e-textlabel pb-4">Paciente</td><td style={{ colspan: '4' }}>
            <input id="idpaciente" name="idpaciente" type="text" data-name='idpaciente' className="e-field e-input" autoComplete='off' pattern="[0-9]+" readOnly/>
            <Button style={{float:'right'}} variant="primary" className='p-1' onClick={this.showModal}>Buscar</Button>
        </td></tr>
        <tr><td className="e-textlabel">Nombre</td><td style={{ colspan: '4' }}>
            <input id="Subject" name="Subject" type="text" data-name='Subject' className="e-field e-input" autoComplete='off' readOnly/>
        </td></tr>
        <tr><td className="e-textlabel">Inicio</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent id="StartTime" data-name="StartTime" format='dd/MM/yy hh:mm a' className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">Fin</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent id="EndTime" data-name="EndTime" format='dd/MM/yy hh:mm a' className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">Descripcion</td><td style={{ colspan: '4' }}>
            <textarea id="Description" name="Description" data-name="Description" className="e-field e-input" rows={2} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
        </td></tr>
        <tr><td className="e-textlabel">Asistio?</td><td style={{ colspan: '4' }}>
            <select className='e-field p-1' id="Asistio" name='Asistio' data-name="Asistio">
                <option value="default" defaultValue>Selecciona una opcion</option>
                <option value="false">No asistio</option>
                <option value="true">Asistio</option>
            </select>
        </td></tr>
        </tbody></table>);
    }

    //Event to add data
    dlgBtnClick() {
        //debugger;//Uncomment this to stop the program and see what's happening
        let schObj = (document.querySelector(".e-schedule")).ej2_instances[0];

        let nombre = (document.querySelector("#Subject"));
        
        let start = (document.querySelector("#StartTime")).ej2_instances[0];
        let end = (document.querySelector("#EndTime")).ej2_instances[0];
        let idpaciente = (document.querySelector("#idpaciente"));
        let asistio = (document.querySelector("#Asistio"))
        let description = (document.querySelector("#Description"))

        let data = [{ Id: (this.temp) ? schObj.eventsData.length + 1 : this.id,
            StartTime: start.value, 
            EndTime: end.value,
            idpaciente: idpaciente.value,
            Asistio: asistio.value,
            Description: description.value,
            Subject: nombre.value}];

        (this.temp) ? schObj.addEvent(data) : schObj.saveEvent(data);
        this.dialogInstance.hide();
    }

    dlgBtnCancel() {
        this.dialogInstance.hide();
    }

    //Event to delete data
    dlgDeleteClick() {
        let schObj = (document.querySelector(".e-schedule")).ej2_instances[0];

        let nombre = (document.querySelector("#Subject"));
        let start = (document.querySelector("#StartTime")).ej2_instances[0];
        let end = (document.querySelector("#EndTime")).ej2_instances[0];
        let idpaciente = (document.querySelector("#idpaciente"));
        let asistio = (document.querySelector("#Asistio"))
        let description = (document.querySelector("#Description"))

        let data = [{ Id: (this.temp) ? schObj.eventsData.length + 1 : this.id, 
            StartTime: start.value, 
            EndTime: end.value,
            idpaciente: idpaciente.value,
            Asistio: asistio.value,
            Description: description.value,
            Subject: nombre.value}];

        schObj.deleteEvent(data);
        this.dialogInstance.hide();
    }

    dlgalertClick() {
        alert("Additional Alert Button");
    }

    onPopupOpen(args) { 
        if(args.type === 'QuickInfo') { //Remove one click event
            args.cancel = true
        }

        if (args.type === "Editor") { //To change data from a appointment created
                args.cancel = true;
                if (args.target.classList.contains("e-appointment")) {
                this.dialogInstance.header = "Modifica cita";
                this.temp = false;
                document.querySelector(".e-delete").style.display = "";
                this.dialogInstance.show();
                let nombre = (document.querySelector("#Subject"));
                let start = (document.querySelector("#StartTime")).ej2_instances[0];
                let end = (document.querySelector("#EndTime")).ej2_instances[0];
                let idpaciente = (document.querySelector("#idpaciente"));
                let asistio = (document.querySelector("#Asistio"));
                let description = (document.querySelector("#Description"));

                this.id = args.data.Id;
                nombre.value = args.data.Subject;
                start.value = args.data.StartTime;
                end.value = args.data.EndTime
                idpaciente.value = args.data.idpaciente;
                asistio.value = args.data.Asistio === 1 ? true : false;
                description.value = args.data.Description;

            } 
            else { //To create a new appointment
                this.dialogInstance.header = "Agenda cita";
                this.temp = true;
                document.querySelector(".e-delete").style.display = "none";
                this.dialogInstance.show();
                let start = (document.querySelector("#StartTime")).ej2_instances[0];
                let end = (document.querySelector("#EndTime")).ej2_instances[0];
                (document.querySelector("#idpaciente").value = '');
                (document.querySelector("#Asistio").value = '');
                (document.querySelector("#Description").value = '');
                (document.querySelector("#Subject").value = '');
                start.value = args.data.StartTime;
                end.value = args.data.EndTime;
            }
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div id='targetElement' className='control-section col-lg-12 defaultDialog dialog-target'>
                    <ScheduleComponent eventSettings={{dataSource: this.data}} height='650px' 
                    ref={schedule => this.scheduleObj = schedule} selectedDate={new Date(2019, 0, 10)} 
                    popupOpen={(this.onPopupOpen.bind(this))}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>

                    <DialogComponent id="defaultdialog" showCloseIcon={true} animationSettings={this.animationSettings} 
                    visible={this.hideDialog} width={'500px'} ref={dialog => this.dialogInstance = dialog} target={'#targetElement'} 
                    header={this.header} buttons={this.dlgButtons} content={this.content} position={this.position}>
                    </DialogComponent>

                    
                    <Modal show={this.state.showModal} onHide={this.hideModal} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Seleccionar un paciente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><PageSearch give_id={this.get_id}></PageSearch></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                        Close
                        </Button>
                    </Modal.Footer>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default Scheduler;



