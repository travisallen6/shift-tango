SELECT u.email, c.email emailok FROM users u
JOIN commsettings c
ON u.emp_id = c.emp_id
WHERE u.emp_id = $1;