import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import RosterDetail from '../RosterDetail/RosterDetail'

class EmployeeControl extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            slideIndex: 0
         }
    }

    handleTabChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    render() { 
        return ( 
            <div>
                <Tabs
                    onChange={this.handleTabChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Profile" value={0} />
                    <Tab label="Schedule" value={1} />
                    <Tab label="Pattern" value={2} />

                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}
                >
                    <div>
                        <RosterDetail />
                    </div>
                
                </SwipeableViews>

            </div>
         )
    }
}
 
export default EmployeeControl;