UPDATE users
SET 
profile_pic = $2, phone = $3, address = $4, city = $5, state = $6, email = $7, zip = $8
WHERE emp_id = $1;

UPDATE commsettings
SET sms = $9, email = $10
WHERE emp_id = $1;
