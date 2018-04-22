DELETE FROM users
WHERE emp_id = $1;

DELETE FROM patterns
WHERE emp_id = $1;

DELETE FROM timeoff
WHERE emp_id = $1;

DELETE FROM exceptions
WHERE emp_id = $1;

DELETE FROM commsettings
WHERE emp_id = $1;