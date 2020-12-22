import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Add_patient from './pages/add_patient.js';
import Search_patient from './pages/search_patient';
import Modify_erase_patient from './pages/modify_erase_patient.js';

import Sidebar from './components/sidebar';

class routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Sidebar/>
                <Switch>
                    <Route path='/agregarpaciente' exact component={Add_patient}/>
                    <Route path='/buscarpaciente' exact component={Search_patient}/>
                    <Route path='/modificarpaciente' exact component={Modify_erase_patient}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default routes;