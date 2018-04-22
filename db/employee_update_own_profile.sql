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

UPDATE commsettings
SET email = $14, sms = $15
WHERE emp_id = $1;

UPDATE patterns
SET emp_id = $6
WHERE emp_id = $1;

UPDATE exceptions
SET emp_id = $6
WHERE emp_id = $1;

SELECT 
u.first_name,	
u.last_name,	
u.profile_pic,
u.position,	
u.mgr,	
u.emp_id,
u.doe,	
u.phone,	
u.address,	
u.city,	
u.state,	
u.zip,	
u.email, 
c.email emailok,
c.sms smsok
FROM users u
JOIN commsettings c
on u.emp_id = c.emp_id
WHERE u.emp_id = $6;
