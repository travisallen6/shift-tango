import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'
import axios from 'axios'
import moment from 'moment'

class PatternModify extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            pattern: props.pattern,

         }
        
        
        let date = moment("2018-04-05 06:35 pm", "YYYY-MM-DD hh:mm a").toDate()
    }

    componentDidMount(){
        axios.get(`/api/employee/${205301}/pattern`)
        .then( empData => {
           let{ sun, mon, tue, wed, thu, fri, sat } = empData.data[0]
            let empPattern = {sun, mon, tue, wed, thu, fri, sat}

            this.setState({pattern: empPattern})
        } )
    }

    render() { 
        return ( 
            <div>
                <Schedule 
                    dateLabel={false}
                    pattern={ this.state.pattern }
                    exceptions={ null }
                    baseDate={"2018-04-10"}
                    selection="pattern"
                />
            </div>
        )
    }
}
 
export default PatternModify;