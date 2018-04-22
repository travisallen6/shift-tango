INSERT INTO terminations
(emp_id, reason, termination_date)
values
($1, $2, $3);

UPDATE users
SET gmail_user = null
WHERE emp_id = $1;