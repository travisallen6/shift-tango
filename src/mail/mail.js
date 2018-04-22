const moment = require('moment')

export function changedScheduleEmail(lastName, firstName, shifts) {

        let shiftsWording = shifts.map( shiftDay => {
            let shiftDate = moment(shiftDay.date).format("MM/DD/YYYY")
            
            let shiftWording

            if(shiftDay.shift === "OFF"){
                shiftWording = `You get the day off!`
            } else {
                let shiftStart = moment(shiftDay.shift.start).format("hh:mm a")
                let shiftEnd = moment(shiftDay.shift.end).format("hh:mm a")
                shiftWording = `You now work from ${shiftStart} to ${shiftEnd}`
            }

            return `<strong>${shiftDate}: </strong><p>${shiftWording}</p><br />`
        })

        let combinedShiftWording = shiftsWording.join("")
        
        
        
        return(

            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Your schedule has been changed</title>
            </head>
            <style>
                body: {
                    
                }

                div {
                    background-color: red;
                }
            </style>
            <body>
            <div style="background-color: powderblue:padding">
            <h1>Hello ${firstName} ${lastName} !</h1>
            <p>We thought you should know that a manager has adjusted your schedule.</p>
            ${combinedShiftWording}
            </div>
            </body>
            </html>`
    )    
}


export function changedPatternEmail(lastName, firstName, shifts) {

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

        return `<strong>${weekDay[i]}: </strong>${shiftWording}<br />`
    })

    let combinedShiftWording = shiftsWording.join("")
    
    
    
    return(

        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Your weekly schedule has been changed</title>
        </head>
        <body>
        <div style="background-color: dodgerblue; padding: 30px; color=white;">
        <h1>Hello ${firstName} ${lastName} !</h1>
        <p>We thought you should know that a manager has adjusted your weekly schedule. Effective immediately, the following will be your schedule:</p>
        ${combinedShiftWording}
        </div>
        </body>
        </html>`
)    
}


export function timeoffRequestemail(request) {

    let { timeoff_id, start_date, end_date, status, reason, request_type, last_name, first_name } = request

    let startDate = moment(start_date).format("MM/DD/YY")
    let endDate = moment(end_date).format("MM/DD/YY")

    let dates = startDate === endDate ? startDate : `${startDate} - ${endDate}`

    let reasonWording = reason ? `The reason provided was ${reason}` : ""
    
    return(

        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Your weekly schedule has been changed</title>
        </head>
        <body>
        <div style="background-color: dodgerblue; padding: 30px; color=white;">
        <img src="https://lh3.google.com/u/0/d/1L3o0TySCNlGaMM88CJEPkL0O7xldlW7O=w1920-h917-iv1" width="400px"
        <h1>Hello ${first_name} ${last_name} !</h1>
        <p>Your manager ${status} your ${request_type} time off request #${timeoff_id} for ${dates}. ${reasonWording} </p>
        </div>
        </body>
        </html>`
)    
}
