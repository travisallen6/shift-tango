import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox'
import {blue200} from 'material-ui/styles/colors'

import moment from 'moment'
import classnames from 'classnames'

import './ScheduleTable.css'


class ScheduleTable extends React.Component {
    
    constructor(){
        super()

        
        
        let date = moment("2018-04-05 06:35 pm", "YYYY-MM-DD hh:mm a").toDate()
        
        this.state = {
            sun: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            mon: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            tue: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            wed: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            thu: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            fri: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },

            sat: {
                inputsShowing: false,
                timeValueStart: '',
                timeValueEnd: '',
                isOff: false
            },
        
        }
            
    }
        
        
// Data is [ { date: "2018-07-" , shift: type: "" | "OFF" | { end:"12:00 pm", start:"04:00 am" } ]

    
    
    toggleEditing(day){
        switch(day){
            case 'sun': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({sun: newDay})
                break
            }
            
            case 'mon': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({mon: newDay})
                break
            }
            
            case 'tue': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({tue: newDay})
                break
            }
            
            case 'wed': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({wed: newDay})
                break
            }
            
            case 'thu': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({thu: newDay})
                break
            }
            
            case 'fri': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({fri: newDay})
                break
            }
            
            case 'sat': {
                let newDay = Object.assign({}, this.state[day], {inputsShowing: !this.state[day].inputsShowing})
                this.setState({sat: newDay})
                break
            }
        }
    }

    updateTimeStart(event, time, day){
        switch(day){
            case 'sun': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({sun: newDay})
                break
            }
            
            case 'mon': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({mon: newDay})
                break
            }
            
            case 'tue': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({tue: newDay})
                break
            }
            
            case 'wed': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({wed: newDay})
                break
            }
            
            case 'thu': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({thu: newDay})
                break
            }
            
            case 'fri': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({fri: newDay})
                break
            }
            
            case 'sat': {
                let newDay = Object.assign({}, this.state[day], {timeValueStart: time})
                this.setState({sat: newDay})
                break
            }
        }
    }

    updateTimeEnd(event, time, day){
        switch(day){
            case 'sun': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({sun: newDay})
                break
            }
            
            case 'mon': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({mon: newDay})
                break
            }
            
            case 'tue': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({tue: newDay})
                break
            }
            
            case 'wed': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({wed: newDay})
                break
            }
            
            case 'thu': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({thu: newDay})
                break
            }
            
            case 'fri': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({fri: newDay})
                break
            }
            
            case 'sat': {
                let newDay = Object.assign({}, this.state[day], {timeValueEnd: time})
                this.setState({sat: newDay})
                break
            }
        }
    }

    toggleOff(day){
        switch(day){
            case 'sun': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({sun: newDay})
                break
            }
            
            case 'mon': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({mon: newDay})
                break
            }
            
            case 'tue': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({tue: newDay})
                break
            }
            
            case 'wed': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({wed: newDay})
                break
            }
            
            case 'thu': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({thu: newDay})
                break
            }
            
            case 'fri': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({fri: newDay})
                break
            }
            
            case 'sat': {
                let newDay = Object.assign({}, this.state[day], {isOff: !this.state[day].isOff})
                this.setState({sat: newDay})
                break
            }
        }
    }
    
    
    render(){

        const dayLabel = classnames({
            'schedule-label-dow': this.props.dateLabel,
            'schedule-label-dow-only': !this.props.dateLabel
        })
        
        const dateLabel = classnames({
            'schedule-label-day': this.props.dateLabel,
            'no-display': ! this.props.dateLabel
        })

        const scheduleValueSun = classnames({
            'schedule-value': !this.state.sun.inputsShowing,
            'no-display': this.state.sun.inputsShowing
        })

        const scheduleValueNotOffSun = classnames({
            'schedule-value-not-off': !this.state.sun.isOff,
            'no-display': this.state.sun.isOff
        })

        const scheduleValueOffSun = classnames({
            'schedule-value-not-off': this.state.sun.isOff,
            'no-display': !this.state.sun.isOff
        })

        const scheduleTimeInputsSun = classnames({
            'schedule-time-inputs': this.state.sun.inputsShowing,
            'no-display': !this.state.sun.inputsShowing
        })




        return ( 
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

        )
    }
}

export default ScheduleTable