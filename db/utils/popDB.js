const faker = require('faker')

module.exports = async function bootStrapDatabase(db) {
    try {
        let users  = await db.utils.bootstrap_db()
        const schedules = [
            ['OFF', 'OFF', '0400-1200', '0400-1200', '0400-1200', '0400-1200', '0400-1200' ],
            ['OFF', 'OFF', '0830-1530', '0830-1530', '0830-1530', '0830-1530', '0830-1530' ],
            ['OFF', 'OFF', '1200-2000', '1200-2000', '1200-2000', '1200-2000', '1200-2000' ],
            ['0400-1200', 'OFF', 'OFF', '0400-1200', '0400-1200', '0400-1200', '0400-1200' ],
            ['0830-1530', 'OFF', 'OFF', '0830-1530', '0830-1530', '0830-1530', '0830-1530' ],
            ['1200-2000', 'OFF', 'OFF', '1200-2000', '1200-2000', '1200-2000', '1200-2000' ],
            ['0400-1200', '0400-1200', 'OFF', 'OFF', '0400-1200', '0400-1200', '0400-1200' ],
            ['0830-1530', '0830-1530', 'OFF', 'OFF', '0830-1530', '0830-1530', '0830-1530' ],
            ['1200-2000', '1200-2000', 'OFF', 'OFF', '1200-2000', '1200-2000', '1200-2000' ],
            ['0400-1200', '0400-1200', '0400-1200', 'OFF', 'OFF', '0400-1200', '0400-1200' ],
            ['0830-1530', '0830-1530', '0830-1530', 'OFF', 'OFF', '0830-1530', '0830-1530' ],
            ['1200-2000', '1200-2000', '1200-2000', 'OFF', 'OFF', '1200-2000', '1200-2000' ],
            ['0400-1200', '0400-1200', '0400-1200', '0400-1200', 'OFF', 'OFF', '0400-1200' ],
            ['0830-1530', '0830-1530', '0830-1530', '0830-1530', 'OFF', 'OFF', '0830-1530' ],
            ['1200-2000', '1200-2000', '1200-2000', '1200-2000', 'OFF', 'OFF', '1200-2000' ],
            ['0400-1200', '0400-1200', '0400-1200', '0400-1200', '0400-1200', 'OFF', 'OFF' ],
            ['0830-1530', '0830-1530', '0830-1530', '0830-1530', '0830-1530', 'OFF', 'OFF' ],
            ['1200-2000', '1200-2000', '1200-2000', '1200-2000', '1200-2000', 'OFF', 'OFF' ],
            ['OFF', '0400-1200', '0400-1200', '0400-1200', '0400-1200', '0400-1200', 'OFF' ],
            ['OFF', '0830-1530', '0830-1530', '0830-1530', '0830-1530', '0830-1530', 'OFF' ],
            ['OFF', '1200-2000', '1200-2000', '1200-2000', '1200-2000', '1200-2000', 'OFF' ],
        ]
        
        let schedIndex = 0;
        for(let i=0; i<users.length; i++) {
            console.log(i+1)
            let userID = users[i].emp_id
            let url = faker.image.avatar()
            await db.utils.add_fake_pic([userID, url])
            await db.utils.add_comm_settings([userID])
            await db.utils.add_emp_pattern([...schedules[schedIndex], userID])
            
            if(schedIndex === schedules.length - 1) schedIndex = 0
            else ++schedIndex 
        }
        console.log('DB Populated')
    } catch(err) {
        console.log(err)
    }
}



