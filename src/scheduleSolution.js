let moment = require('moment');

let exceptions = [
  {type:'trade', date:'2018-04-05', shift:'0400-1200'},
  {type:'uto', date:'2018-04-08', shift:'OFF'}
]

let pattern = {su: "0400-1200",	mo:"0400-1200",	tu:"0400-1200",	we:"0400-1200",	th:"OFF",	fr:"OFF",	sa:"OFF"}

// Take in a date, pattern object, exception Array
// Return array of objects with {date: , shiftStart: , shiftEnd, type}


function mergeSchedules(date, pattern){
  let dateRange = [];
  let startDate = moment(date).startOf('week').format('YYYY-MM-DD')
  
  let dateGroups = []
  
  for(let i=0; i < 7; i++){
    
    let dateObj = {}
    let patternDate = ''
    
    switch(i) {
      case 0:
        dateObj.shift = pattern.su
        break;
      
      case 1:
        dateObj.shift = pattern.mo
        break;
      
      case 2:
        dateObj.shift = pattern.tu
        break;
      
      case 3:
        dateObj.shift = pattern.we
        break;
      
      case 4:
        dateObj.shift = pattern.th
        break;
        
      case 5:
        dateObj.shift = pattern.fr
        break;
        
      case 6:
        dateObj.shift = pattern.sa
        break;
    }
    
    dateObj.date = (moment(startDate).add(i,'d').format('YYYY-MM-DD'))
    dateObj.type = 'pattern'
    
    let matchException = exceptions.filter(val => val.date === dateObj.date)
    console.log(matchException)
    
    let pushObj = matchException.length === 1 ? matchException[0] : dateObj
    
    dateGroups.push(pushObj)
  }
  return dateGroups
}

mergeSchedules('2018-04-08', pattern, exceptions)

