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
