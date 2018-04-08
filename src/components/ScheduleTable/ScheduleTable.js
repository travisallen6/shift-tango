import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {blue200} from 'material-ui/styles/colors'
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox'

import moment from 'moment'


import './ScheduleTable.css'




class ScheduleTable extends React.Component {

    constructor(){
        super()

        let date = moment("2018-04-05 06:35 pm", "YYYY-MM-DD hh:mm a").toDate()

        this.state = {
            satInputsShowing: false,
            timeValue: date,
            satIsOff: true
        }

        this.toggleFns = this.toggleFns.bind(this)
        this.updateTime = this.updateTime.bind(this)
    }

// Data is [ { date: "2018-07-" , shift: type: "" | "OFF" | { end:"12:00 pm", start:"04:00 am" } ]

    
    
    toggleFns(){

        this.setState({satInputsShowing: !this.state.satInputsShowing})
    }

    updateTime(event, time){
        this.setState({timeValue: time})
    }
    
    render(){
        return ( 
            <Paper zDepth={1} style={{width:'90%', padding:'20px'}}>
                <Divider />
                <div className='schedule-row'>

                    <div className="schedule-input-toggle">
                    <Checkbox 
                            onCheck={this.toggleFns} />
                    </div>
                
                    <div className="schedule-date-label">
                        <div className='schedule-label-row schedule-label-dow'>
                            Mon
                        </div>
                        <div className='schedule-label-row schedule-label-day'>
                            12/31
                        </div>
                    </div>

                { !this.state.satInputsShowing &&   
                    <div className="schedule-value">
                        {!this.state.satIsOff && (
                            <div>
                                <div className="schedule-value-r1"> 04:00 am </div>
                                <div className="schedule-value-r2"> 12:00 pm </div> 
                            </div>
                            )} 
                        {this.state.satIsOff &&
                        <div className="schedule-value-off">
                            OFF
                        </div>}
                    </div> }

                {this.state.satInputsShowing &&    <div className="schedule-time-inputs">
                        <TimePicker
                            hintText="Start Time"
                            minutesStep={5} 
                            onChange={ this.updateTime }
                            value={ this.state.timeValue} 
                            textFieldStyle={{fontSize:22}} />
                        <TimePicker
                            hintText="End Time"
                            minutesStep={5} 
                            onChange={ this.updateTime }
                            value={ this.state.timeValue}
                            textFieldStyle={{fontSize:22}}/>
                </div> }
                </div>

                <Divider />

                <div className='schedule-row'>

                    <div className="schedule-input-toggle">
                        <Checkbox 
                            onCheck={this.toggleFns} />
                    </div>

                    <div className="schedule-date-label">
                        <div className='schedule-label-row schedule-label-dow'>
                            Mon
                        </div>
                        <div className='schedule-label-row schedule-label-day'>
                            12/31
                        </div>
                    </div>

                    { !this.state.satInputsShowing &&   <div className="schedule-value">
                        <div className="schedule-value-r1"> 04:00 am </div>
                        <div className="schedule-value-r2"> 12:00 pm </div>
                    </div> }

                    {this.state.satInputsShowing &&    <div className="schedule-time-inputs">
                        <TimePicker
                            hintText="Start Time"
                            minutesStep={5} 
                            onChange={ this.updateTime }
                            value={ this.state.timeValue} 
                            textFieldStyle={{fontSize:22}} />
                        <TimePicker
                            hintText="End Time"
                            minutesStep={5} 
                            onChange={ this.updateTime }
                            value={ this.state.timeValue}
                            textFieldStyle={{fontSize:22}}/>
                    </div> }
                    </div>
            </Paper>

        )
    }
}

export default ScheduleTable