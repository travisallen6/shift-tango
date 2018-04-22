UPDATE users

SET 
first_name = $2,	
last_name = $3,	
position = $4,	
mgr = $5,	
emp_id = $6,
doe = $7,	
phone = $8,	
address = $9,	
city = $10,	
state = $11,	
zip = $12,	
email = $13

WHERE emp_id = $1;

UPDATE patterns
SET emp_id = $6
WHERE emp_id = $1;

UPDATE exceptions
SET emp_id = $6
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
WHERE emp_id = $6
