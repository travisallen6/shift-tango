SELECT u.emp_id, u.mgr, u.last_name, u.first_name, u.auth_id, u.profile_pic, u.gmail_user, u.phone, u.position, u.doe, u.address, u.city, u.state, u.zip, u.email, c.sms smsOk, c.email emailOk 
FROM users u
LEFT JOIN commsettings c
ON u.emp_id = c.emp_id 
WHERE u.emp_id = $1;


