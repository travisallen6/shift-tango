UPDATE users
SET 
profile_pic = $2, phone = $3, address = $4, city = $5, state = $6, email = $7, zip = $8
WHERE emp_id = $1 