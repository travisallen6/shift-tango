import moment from 'moment'


export function exceptionSms(shifts){

    let shiftsWording = shifts.map( shiftDay => {
        let shiftDate = moment(shiftDay.date).format("MM/DD/YYYY")
        
        let shiftWording

        if(shiftDay.shift === "OFF"){
            shiftWording = `OFF`
        } else {
            let shiftStart = moment(shiftDay.shift.start).format("hh:mm a")
            let shiftEnd = moment(shiftDay.shift.end).format("hh:mm a")
            shiftWording = `${shiftStart} - ${shiftEnd}`
        }

        return ` \n${shiftDate}: ${shiftWording}`
    })

    let combinedShiftWording = shiftsWording.join("")

    return (
        `Your schedule has been changed: ${combinedShiftWording}`
    )

}

export function patternSms(shifts) {

    let shiftsWording = shifts.map( (shiftDay, i) => {
        
        let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        
        let shiftWording

        if(shiftDay.shift === "OFF"){
            shiftWording = `OFF`
        } else {
            let shiftStart = moment(shiftDay.shift.start).format("hh:mm a")
            let shiftEnd = moment(shiftDay.shift.end).format("hh:mm a")
            shiftWording = `${shiftStart} - ${shiftEnd}`
        }

        return `\n${weekDay[i]}: ${shiftWording}`
    })

    let combinedShiftWording = shiftsWording.join("")
    
    
    
    return(

        `Your weekly schedule has changed ${combinedShiftWording}`
)    
}

export function timeoffRequestSms(request) {

    let { timeoff_id, start_date, end_date, status, reason, request_type, last_name, first_name } = request

    let startDate = moment(start_date).format("MM/DD/YY")
    let endDate = moment(end_date).format("MM/DD/YY")

    let dates = startDate === endDate ? startDate : `${startDate} - ${endDate}`

    let reasonWording = reason ? `The reason provided was ${reason}.` : ""
    
    return(

        `Your ${request_type} time off request #${timeoff_id} for ${dates} has been ${status}. ${reasonWording}` 
    )    
}