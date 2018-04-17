UPDATE users

SET 
first_name = $2,	
last_name = $3,	
profile_pic = $4,
position = $5,	
mgr = $6,	
emp_id = $7,
doe = $8,	
phone = $9,	
address = $10,	
city = $11,	
state = $12,	
zip = $13,	
email = $14

WHERE emp_id = $1;

UPDATE patterns
SET emp_id = $7
WHERE emp_id = $1;

UPDATE exceptions
SET emp_id = $7
WHERE emp_id = $1;

SELECT 
first_name,	
last_name,	
profile_pic,
position,	
mgr,	
emp_id,
doe,	
phone,	
address,	
city,	
state,	
zip,	
email
from users
WHERE emp_id = $7;
