import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'

class PatternModify extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Schedule 
                    dateLabel={false}
                    // baseDate={}
                    // numWeeks={}
                    // scheduleType={}
                    // employeeNum={}
                    // pattern, exception, etc.
                />
            </div>
        )
    }
}
 
export default PatternModify;