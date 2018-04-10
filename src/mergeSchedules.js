  module.exports = function mergeSchedules(date, pattern, exceptions, selection){
    let moment = require('moment');
    // let dateRange = [];
    let startDate = moment(date).startOf('week').format('YYYY-MM-DD')
    
    let dateGroups = []
    
    for(let i=0; i < 7; i++){
      // Populate an array with the pattern data.
      
      let dateObj = {}
      
      switch(i) {
        case 0:
          dateObj.shift = pattern.sun
          break
        
        case 1:
          dateObj.shift = pattern.mon
          break
        
        case 2:
          dateObj.shift = pattern.tue
          break
        
        case 3:
          dateObj.shift = pattern.wed
          break
        
        case 4:
          dateObj.shift = pattern.thu
          break
          
        case 5:
          dateObj.shift = pattern.fri
          break
          
        case 6:
          dateObj.shift = pattern.sat
          break
        
        default:
          break
      }
      
      dateObj.date = (moment(startDate).add(i,'d').format('YYYY-MM-DD'))
      dateObj.type = 'pattern'
      dateGroups.push(dateObj)
      
    }

    if(selection === 'pattern'){
      return dateGroups
    }

    // Map over the pattern array
    // - Check if there is an exception that matches the patterns date
    // - if so, exception should replace the pattern

    dateGroups = dateGroups.map( (element, i, arr) =>{
      let exceptionMatch = exceptions.filter( val => val.date === element.date )
      if (exceptionMatch.length > 0) {
        return exceptionMatch[0]
      } else { 
        return element
      }
    })
    
    function parseShift(shiftString){
    
      let shift = shiftString
    
      let shiftCheck = shift.split('')
      
      if(shiftCheck.indexOf('-') !== -1){
        
        
        let startH = shiftCheck[0] + shiftCheck[1]
        let startM = shiftCheck[2] + shiftCheck[3]
        let endH = shiftCheck[5] + shiftCheck[6]
        let endM = shiftCheck[7] + shiftCheck[8]
    
        let start = moment().hour(startH).minute(startM).format('hh:mm a')
        let end = moment().hour(endH).minute(endM).format('hh:mm a')
        
        return { start, end }
      }
    
      return shift
      
      
    }
    
    dateGroups.map( element => {
        if(element.shift){
          element.shift = parseShift(element.shift)
        }
        return element
    })
    
    return dateGroups
  }