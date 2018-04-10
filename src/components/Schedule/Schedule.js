import React from 'react';

import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox'

import moment from 'moment'
import classnames from 'classnames'
import axios from 'axios'
import mergeSchedules from '../../mergeSchedules'

import './Schedule.css'
class Schedule extends React.Component {
    constructor(props) {
        super(props);
        
        let date = moment("2018-04-05 06:35 pm", "YYYY-MM-DD hh:mm a").toDate()
        
        
        this.state = {
            loading: true,
            shifts: [
                {
                    date: "2018-04-06",
                    inputsShowing: false,
                    timeValueStart: '04:00 am',
                    timeValueEnd: '12:00 pm',
                    timeInputStart: moment("2018-04-06 04:00 am", "YYYY-MM-DD hh:mm a").toDate(),
                    timeInputEnd: moment("2018-04-06 12:00 pm", "YYYY-MM-DD hh:mm a").toDate(),
                    isOff: false
                },
                {
                    date: "2018-04-07",
                    inputsShowing: false,
                    timeValueStart: '',
                    timeValueEnd: '',
                    timeInputStart: '',
                    timeInputEnd: '',
                    isOff: true
                },

            ]
            
            
        
        }
            
    }
    

    

        
    
    
// Data is [ { date: "2018-07-" , shift: type: "" | "OFF" | { end:"12:00 pm", start:"04:00 am" } ]
    // componentDidMount(){
    //     axios.get(`/api/employee/${this.props.match.params.empid}/pattern`)
    //     .then( empPattern =>{
    //         let patternDate = moment().format('YYYY-MM-DD')
    //         let {last_name, first_name, emp_id, profile_pic, sun, mon, tue, wed, thu, fri, sat} = empPattern.data[0]
    //         let employeePattern = {sun, mon, tue, wed, thu, fri, sat}
            
    //         let parsedPattern = mergeSchedules(patternDate, employeePattern, null, 'pattern')
    //         parsedPattern.map( (day, i) => {})
            
           
    //     })
    // }


    

        
        
    render() {

        let mappedShifts = this.state.shifts
        .map( (shift, i, arr) =>{

            
            <div className='schedule-row'>

                    <div className="schedule-input-toggle">
                    <Checkbox 
                            onCheck={()=>this.toggleEditing(i)} />
                    </div>
                
                    <div className="schedule-date-label">
                        <div className="schedule-label-dow">
                            {moment(shift.date).format('ddd')}
                        </div>
                        <div className="schedule-date-label">
                            {moment(shift.date).format('M/D')}
                        </div>
                    </div>

                  
                    <div className="schedule-value">
                        
                        <div className="schedule-value-not-off">
                            
                            <div> {this.state.shift[i].timeValueStart} </div>
                            <div>{ this.state.shift[i].timeValueEnd } </div> 
                        
                        </div>
                            
                        <div className='schedule-value-off'>
                            OFF
                        </div>
                      
                    </div> 

                   
                <div className='schedule-time-inputs'>
                    <div className="schedule-input-group">

                        <TimePicker
                            hintText="Start"
                            minutesStep={5} 
                            onChange={ (event, time) => this.updateTimeStart(event, time, i) }
                            value={ this.state.shift[i].timeValueStart} 
                            textFieldStyle={{fontSize:22, height: 38, width:94}} 
                            style={{height: 38, width: 94}}
                            disabled={this.state.shift[i].isOff}
                            />
                        <TimePicker
                            hintText="End"
                            minutesStep={5} 
                            onChange={ (event, time, i) => this.updateTimeEnd(event, time, i) }
                            value={ this.state.shift[i].timeValueEnd}
                            textFieldStyle={{fontSize:22, height: 38, width:94}}
                            style={{height: 38, width: 94}}
                            disabled={this.state.shift[i].isOff}/>
                    </div>
                    <div className="schedule-off-toggle">
                        <Toggle
                            label="OFF" 
                            labelPosition='right' 
                            onToggle={ ()=>this.toggleOff(i) }
                            toggled={this.state.shift[i].isOff}/>
                    </div>
                </div> 
            </div>
       
    })
        return ( 
            <div className="pattern-modify-container">
                <Paper zDepth={1} style={{width:'90%', padding:'20px'}}>
                <Divider />

        {/* ===SUNDAY=== */}

                <div className='schedule-row'>

                    <div className="schedule-input-toggle">
                    <Checkbox 
                            onCheck={()=>this.toggleEditing('sun')} />
                    </div>
                
                    <div className="schedule-date-label">
                        <div className={ dayLabel }>
                            Sun
                        </div>
                        <div className={ dateLabel }>
                            12/31
                        </div>
                    </div>

                  
                    <div className={ scheduleValueSun }>
                        
                        <div className={ scheduleValueNotOffSun }>
                            
                            <div> {moment(this.state.sun.timeValueStart).format('hh:mm a')} </div>
                            <div> {moment(this.state.sun.timeValueEnd).format('hh:mm a')} </div> 
                        
                        </div>
                            
                        <div className={ scheduleValueOffSun }>
                            OFF
                        </div>
                      
                    </div> 

                   
                <div className={ scheduleTimeInputsSun }>
                    <div className="schedule-input-group">

                        <TimePicker
                            hintText="Start"
                            minutesStep={5} 
                            onChange={ (event, time) => this.updateTimeStart(event, time, 'sun') }
                            value={ this.state.sun.timeValueStart} 
                            textFieldStyle={{fontSize:22, height: 38, width:94}} 
                            style={{height: 38, width: 94}}
                            disabled={this.state.sun.isOff}
                            />
                        <TimePicker
                            hintText="End"
                            minutesStep={5} 
                            onChange={ (event, time) => this.updateTimeEnd(event, time, 'sun') }
                            value={ this.state.sun.timeValueEnd}
                            textFieldStyle={{fontSize:22, height: 38, width:94}}
                            style={{height: 38, width: 94}}
                            disabled={this.state.sun.isOff}/>
                    </div>
                    <div className="schedule-off-toggle">
                        <Toggle
                            label="OFF" 
                            labelPosition='right' 
                            onToggle={ ()=>this.toggleOff('sun') }
                            toggled={this.state.sun.isOff}/>
                    </div>
                </div> 
                </div>

                <Divider />

                
            </Paper>

            </div> 

        )
    }
}
 
export default Schedule;