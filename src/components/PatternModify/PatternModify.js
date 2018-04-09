import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ScheduleTable from '../ScheduleTable/ScheduleTable'

import {
    Table,
    TableBody,
    // TableFooter,
    // TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import './PatternModify.css'

class PatternModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            sunSwitch: false,
            monSwitch: false,
            tueSwitch: false,
            wedSwitch: false,
            thuSwitch: false,
            friSwitch: false,
            satSwitch: false,
         }
    }

       
    
    render() {
        const style = {
            marginLeft: 20,
          }; 
       
        return ( 
            <div 
            
              className="pattern-modify-container">
                <ScheduleTable 
                    // scheduleData={}
                    dateLabel={true}
                />

            </div> 

        )
    }
}
 
export default PatternModify;




// import {
//     Table,
//     TableBody,
//     TableFooter,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
//   } from 'material-ui/Table';
//   import TextField from 'material-ui/TextField';
//   import Toggle from 'material-ui/Toggle';
  
//   const styles = {
//     propContainer: {
//       width: 200,
//       overflow: 'hidden',
//       margin: '20px auto 0',
//     },
//     propToggleHeader: {
//       margin: '20px auto 10px',
//     },
//   };
  
//   const tableData = [
//     {
//       name: 'John Smith',
//       status: 'Employed',
//     },
//     {
//       name: 'Randal White',
//       status: 'Unemployed',
//     },
//     {
//       name: 'Stephanie Sanders',
//       status: 'Employed',
//     },
//     {
//       name: 'Steve Brown',
//       status: 'Employed',
//     },
//     {
//       name: 'Joyce Whitten',
//       status: 'Employed',
//     },
//     {
//       name: 'Samuel Roberts',
//       status: 'Employed',
//     },
//     {
//       name: 'Adam Moore',
//       status: 'Employed',
//     },
//   ];
  
//   /**
//    * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
//    */
//   export default class TableExampleComplex extends Component {
//     state = {
//       fixedHeader: true,
//       fixedFooter: true,
//       stripedRows: false,
//       showRowHover: false,
//       selectable: true,
//       multiSelectable: false,
//       enableSelectAll: false,
//       deselectOnClickaway: true,
//       showCheckboxes: true,
//       height: '300px',
//     };
  
//     handleToggle = (event, toggled) => {
//       this.setState({
//         [event.target.name]: toggled,
//       });
//     };
  
//     handleChange = (event) => {
//       this.setState({height: event.target.value});
//     };
  
//     render() {
//       return (
        
//       );
//     }
//   }