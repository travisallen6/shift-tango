SELECT u.phone, c.sms
FROM users u
JOIN commsettings c
ON u.emp_id = c.emp_id
WHERE u.emp_id = $1