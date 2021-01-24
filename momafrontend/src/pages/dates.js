import React, { Component } from 'react'
import Scheduler from '../components/scheduler';

class Dates extends Component {
    render() {
        return (
            <div>
                <div className='scheduler-container'>
                    <Scheduler/>
                </div>
            </div>
        )
    }
}

export default Dates;