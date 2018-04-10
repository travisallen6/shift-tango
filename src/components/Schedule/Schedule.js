import React from 'react';

import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox'

import moment from 'moment'
import mergeSchedules from '../../mergeSchedules'

import './Schedule.css'
class Schedule extends React.Component {
    constructor(props) {
        super(props);
        
        
        
        
        this.state = {
            loading: true,
            shifts: []
            //     {
            //         date: "2018-04-06",
            //         inputsShowing: false,
            //         timeValueStart: '04:00 am',
            //         timeValueEnd: '12:00 pm',
            //         timeInputStart: moment("2018-04-06 04:35 am", "YYYY-MM-DD hh:mm a").toDate(),
            //         timeInputEnd: moment("2018-04-06 12:25 pm", "YYYY-MM-DD hh:mm a").toDate(),
            //         isOff: false
            //     },
            //     {
            //         date: "2018-04-07",
            //         inputsShowing: false,
            //         timeValueStart: '',
            //         timeValueEnd: '',
            //         timeInputStart: '',
            //         timeInputEnd: '',
            //         isOff: true
            //     },

            // ]
            
            
        
        }
            
    }
    

    

        
    
    
// Data is [ { date: "2018-07-" , shift: type: "" | "OFF" | { end:"12:00 pm", start:"04:00 am" } ]
    componentWillReceiveProps(newProps){
        if( newProps.pattern !== undefined){
            let { baseDate, exceptions, pattern, selection } = newProps
            
            let parsedSchedule = mergeSchedules(baseDate, pattern, exceptions, selection)

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
                            inputsShowing: false,
                            timeValueStart: '',
                            timeValueEnd: '',
                            timeInputStart: '',
                            timeInputEnd: '',
                            isOff: true
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
                            isOff: false
                        }
                        
                        return pushShift
                    }
                    


                })

                this.setState({shifts: pushSchedule})
            }


            //         date: "2018-04-07",
            //         inputsShowing: false,
            //         timeValueStart: '',
            //         timeValueEnd: '',
            //         timeInputStart: '',
            //         timeInputEnd: '',
            //         isOff: true
        }
        




        


        
    }

    toggleEditing(i){

        let { timeValueStart, timeValueEnd, date, timeInputStart, timeInputEnd, isOff } = this.state.shifts[i]
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
                date: date,
                inputsShowing: false,
                timeValueStart: timeValueStart,
                timeValueEnd: timeValueEnd,
                timeInputStart: moment(date +' '+ timeValueStart, "YYYY-MM-DD hh:mm a").toDate(),
                timeInputEnd: moment(date +' '+ timeValueEnd, "YYYY-MM-DD hh:mm a").toDate(),
                isOff: newIsoff
            }

            freshShifts.splice(i, 1, newShift)
            this.setState({shifts: freshShifts})
        } else {
            let newShift = {
                date: date,
                inputsShowing: true,
                timeValueStart: timeValueStart,
                timeValueEnd: timeValueEnd,
                timeInputStart: timeInputStart,
                timeInputEnd: timeInputEnd,
                isOff: isOff
            }

            freshShifts.splice(i, 1, newShift)
            this.setState({shifts: freshShifts})
        }
    }

    updateTimeStart(event, time, i){
      
        let newShift = Object.assign({}, this.state.shifts[i], {timeInputStart: time})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)

    }

    updateTimeEnd(event, time, i){
      
        let newShift = Object.assign({}, this.state.shifts[i], {timeInputEnd: time})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)

    }

    toggleOff(i){
        let { isOff } = this.state.shifts[i]
        let newShift = Object.assign({}, this.state.shifts[i], {isOff: !isOff})
        let freshShifts = [...this.state.shifts]
        freshShifts.splice(i, 1, newShift)
        this.setState({shifts: freshShifts})
    }
    

        
        
    render() {



        let mappedShifts = this.state.shifts
        .map( (shift, i, arr) =>{

            const dowStyles= this.props.dateLabel 
                ? {fontSize: 24} 
                : {fontSize: 34}
            

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
                            
                            <div> {this.state.shifts[i].timeValueStart} </div>
                            <div>{ this.state.shifts[i].timeValueEnd } </div> 
                        
                        </div>}
                            
                        {this.state.shifts[i].isOff && <div 
                            className='schedule-value-off'>
                            OFF
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
                            textFieldStyle={{fontSize:22, height: 38, width:94}} 
                            style={{height: 38, width: 94}}
                            disabled={this.state.shifts[i].isOff}
                            />
                        <TimePicker
                            hintText="End"
                            minutesStep={5} 
                            onChange={ (event, time, i) => this.updateTimeEnd(event, time, i) }
                            value={ this.state.shifts[i].timeInputEnd}
                            textFieldStyle={{fontSize:22, height: 38, width:94}}
                            style={{height: 38, width: 94}}
                            disabled={this.state.shifts[i].isOff}/>
                    </div>
                    <div className="schedule-off-toggle">
                        <Toggle
                            label="OFF" 
                            labelPosition='right' 
                            onToggle={ ()=>this.toggleOff(i) }
                            toggled={this.state.shifts[i].isOff}/>
                    </div>
                </div>)} 
            </div>
            <Divider />
        </div>
       
        )
    })
        return ( 
            <div className="pattern-modify-container">
                <Paper zDepth={1} style={{width:'90%', padding:'20px'}}>
                <Divider />
                    {mappedShifts}

                
            </Paper>

            </div> 

        )
    }
}
 
export default Schedule;