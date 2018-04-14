import React from 'react';

import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import moment from 'moment'
import mergeSchedules from '../../mergeSchedules'

import './Schedule.css'
class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            shifts: []
        }
            
    }

    componentWillReceiveProps(newProps){
        // Check if the new props are any different 
       

        let baseDateEqual = this.props.baseDate === newProps.baseDate
        let exceptionsEqual = this.props.exceptions === newProps.exceptions
        let patternEqual = this.props.pattern === newProps.pattern
        let selectionEqual = this.props.selection === newProps.selection

        if(!baseDateEqual || !exceptionsEqual || !patternEqual || !selectionEqual){

            // Do nothing if the pattern is not yet defined
            if( newProps.pattern !== undefined){
                
                
                let parsedSchedule = mergeSchedules(newProps.baseDate, newProps.pattern, newProps.exceptions, newProps.selection)

                let undefinedShifts = false

                parsedSchedule.forEach( schedule =>{
                    if(schedule.shift === undefined){
                        undefinedShifts = true
                    }
                })

                if(!undefinedShifts){
                    let pushShift = {}

                    let pushSchedule = parsedSchedule.map( empShift => {
                        let shiftOff = empShift.shift === "OFF"

                        if(shiftOff){
                            pushShift = {
                                date: empShift.date,
                                type: empShift.type,
                                inputsShowing: false,
                                timeValueStart: '',
                                timeValueEnd: '',
                                timeInputStart: moment(`${empShift.date} 12:00 am`, "YYYY-MM-DD hh:mm a").toDate(),
                                timeInputEnd: moment(`${empShift.date} 12:00 am`, "YYYY-MM-DD hh:mm a").toDate(),
                                isOff: true,
                                typeInput: ''
                            }

                            return pushShift

                        } else {

                            pushShift = {
                                date: empShift.date,
                                type: empShift.type,
                                inputsShowing: false,
                                timeValueStart: empShift.shift.start,
                                timeValueEnd: empShift.shift.end,
                                timeInputStart: moment(`${empShift.date} ${empShift.shift.start}`, "YYYY-MM-DD hh:mm a").toDate(),
                                timeInputEnd: moment(`${empShift.date} ${empShift.shift.end}`, "YYYY-MM-DD hh:mm a").toDate(),
                                isOff: false,
                                typeInput: ''
                            }
                            
                            return pushShift
                        }
                    })

                    this.setState({shifts: pushSchedule})
                }
            }
        }
        




        


        
    }

    toggleEditing(i){

        let { timeValueStart, timeValueEnd, date } = this.state.shifts[i]
        let freshShifts = [...this.state.shifts]

        if(this.state.shifts[i].inputsShowing){
            // If the user unchecks the editing box
            // inputs showing = false
            // timeInputStart / timeInputEnd = timeValueStart/TimeValueEnd
            // if timevaluestart/end = '', is off=true, else false
            let newIsoff = 
                timeValueStart === '' && timeValueEnd === ''
                ? true 
                : false; 

            let newShift = {
                inputsShowing: false,
                timeInputStart: moment(date +' '+ timeValueStart, "YYYY-MM-DD hh:mm a").toDate(),
                timeInputEnd: moment(date +' '+ timeValueEnd, "YYYY-MM-DD hh:mm a").toDate(),
                isOff: newIsoff
            }

            /////
            let replacementShift = Object.assign({}, this.state.shifts[i], newShift)
            // let freshShifts = [...this.state.shifts]
            freshShifts.splice(i, 1, replacementShift)
            this.setState({shifts: freshShifts})
            
        } else {
            let newShift = {
                inputsShowing: true,
            }

            /////
            let replacementShift = Object.assign({}, this.state.shifts[i], newShift)
            // let freshShifts = [...this.state.shifts]
            freshShifts.splice(i, 1, replacementShift)
            this.setState({shifts: freshShifts})
        }
    }

    updateTimeStart(event, time, i){
      
        let newShift = Object.assign({}, this.state.shifts[i], {timeInputStart: time})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)
        this.setState({shifts: freshShifts})

    }

    updateTimeEnd(event, time, i){
      
        let newShift = Object.assign({}, this.state.shifts[i], {timeInputEnd: time})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)
        this.setState({shifts: freshShifts})

    }

    toggleOff(i){
        let { isOff } = this.state.shifts[i]
        let newShift = Object.assign({}, this.state.shifts[i], {isOff: !isOff})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)
        this.setState({shifts: freshShifts})
    }

    handleReasonInputChange(e, i){
        if(e.target.value.length <= 5){
            let newShift = Object.assign({}, this.state.shifts[i], {typeInput: e.target.value})
            let freshShifts = [...this.state.shifts]
            freshShifts.splice(i, 1, newShift)
            this.setState({shifts: freshShifts})
        }
    }

    
    render() {

        let mappedShifts = this.state.shifts
        .map( (shift, i, arr) =>{

            const dowStyles= this.props.dateLabel 
                ? {fontSize: 24} 
                : {fontSize: 30}
            

            return (

            <div key={i + shift.date}>
                
                <div className='schedule-row'>

                    <div className="schedule-input-toggle">
                    <Checkbox 
                            onCheck={()=>this.toggleEditing(i)} />
                    </div>
                
                    <div className="schedule-date-label">
                        <div 
                            className="schedule-label-dow"
                            style={ dowStyles }>
                            {moment(shift.date).format('ddd')}
                        </div>
                        {this.props.dateLabel && ( <div
                            className="schedule-label-day">

                            {moment(shift.date).format('M/D')}

                        </div> ) }
                    </div>

                  
                    { ! this.state.shifts[i].inputsShowing &&  <div className="schedule-value">
                        
                        {!this.state.shifts[i].isOff && <div
                            className="schedule-value-not-off">

                            <div className="schedule-value-time-container">
                                <div> {this.state.shifts[i].timeValueStart} </div>
                                <div>{ this.state.shifts[i].timeValueEnd } </div> 
                            </div>
                        
                        </div>}
                            
                        {this.state.shifts[i].isOff && <div 
                            className='schedule-value-off'>
                            OFF
                        </div>}

                        {shift.type !== "pattern" && <div 
                            className='schedule-value-type'> 
                            {shift.type}
                        </div>}
                      
                    </div> } 

                   
                {this.state.shifts[i].inputsShowing && (<div
                    className='schedule-time-inputs'>
                    <div className="schedule-input-group">

                        <TimePicker
                            hintText="Start"
                            minutesStep={5} 
                            onChange={ (event, time) => this.updateTimeStart(event, time, i) }
                            value={ this.state.shifts[i].timeInputStart} 
                            textFieldStyle={{
                                fontSize:22, 
                                // height: 38, 
                                height:'100%',
                                width:94,
                                // background: 'blue'
                            }} 
                            style={{
                                // height: 25,
                                height: '50%', 
                                width: 94,
                                // background: 'yellow'
                            }}
                            disabled={this.state.shifts[i].isOff}
                            />
                        <TimePicker
                            hintText="End"
                            minutesStep={5} 
                            onChange={ (event, time) => this.updateTimeEnd(event, time, i) }
                            value={ this.state.shifts[i].timeInputEnd}
                            textFieldStyle={{
                                // background: "green",
                                fontSize:22, 
                                height: 38, 
                                width:94}}
                            style={{
                                height: 25, 
                                width: 94,
                                // background: "red"
                            }}
                            disabled={this.state.shifts[i].isOff}/>
                    </div>
                    <div className="schedule-off-toggle">
                        <Toggle
                            label="OFF" 
                            labelPosition='right' 
                            onToggle={ ()=>this.toggleOff(i) }
                            toggled={this.state.shifts[i].isOff}/>
                        {this.props.selection === "mixed" && <div className="schedule-reason-input">
                            <TextField
                                hintText="Reason"
                                onChange={(e)=>this.handleReasonInputChange(e, i)}
                                value={ this.state.shifts[i].typeInput }
                                style={{width:"100%", height:"100%"}}
                                inputStyle={{width: "100%", height:"100%"}}
                            />
                            
                        </div>}
                    </div>
                </div>)} 
            </div>
            <Divider />
        </div>
       
        )
    })
        return (

            <div>
                {mappedShifts}
                <div className="schedule-save-container">
                    <RaisedButton
                        style={{width:"50%", height: 40}}
                        secondary={true}
                        label="save"
                        labelStyle={{fontSize:20}}
                        onClick={()=>this.props.checkFunction(this.state.shifts)}
                    />
                </div>
            </div> 

        )
    }
}
 
export default Schedule;