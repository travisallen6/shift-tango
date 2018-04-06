import React from "react";
import {Switch, Route} from 'react-router-dom';

import RosterDetail from '../RosterDetail/RosterDetail'
import AppBar from 'material-ui/AppBar';
import ManagerRoster from '../ManagerRoster/ManagerRoster'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



class ManagerDash extends React.Component {

   
    render(){

        return(
            <div>

                <AppBar 
                    title="Dash"
                    iconElementRight={
                        <FloatingActionButton 
                            secondary={true}
                            mini={true}
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    }
                />
                
                <Switch>
                    <Route exact path='/managerdash' component={ManagerRoster} />
                    <Route path='/managerdash/detail/' component={RosterDetail} />
                </Switch>
                
            </div>
        )
    }
}

export default ManagerDash;