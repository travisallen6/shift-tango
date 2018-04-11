import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import './PatternModify.css'



class PatternModify extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            pattern: props.pattern,

         }
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
            <div className="pattern-modify-container">
                <Paper 
                    zDepth={1} 
                    style={{width:'90%', padding:'20px'}}
                >
                    <Divider />
                    <Schedule 
                        dateLabel={false}
                        pattern={ this.state.pattern }
                        exceptions={ null }
                        baseDate={"2018-04-10"}
                        selection="pattern"
                    />
                </Paper>
            </div>  
        )
    }
}
 
export default PatternModify;