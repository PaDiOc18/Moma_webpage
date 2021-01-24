import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Add_patient from './pages/add_patient.js';
import Search_patient from './pages/search_patient';
import Modify_erase_patient from './pages/modify_erase_patient.js';
import Patient_date from './pages/patient_date.js';
import Dates from './pages/dates';  
import Sidebar from './components/sidebar';
import Home from './pages/home';

class routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Sidebar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/agregarpaciente' exact component={Add_patient}/>
                    <Route path='/buscarpaciente' exact component={Search_patient}/>
                    <Route path='/modificarpaciente' exact component={Modify_erase_patient}/>
                    <Route path='/historialpaciente' exact component={Patient_date}/>
                    <Route path='/citas' exact component={Dates}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default routes;