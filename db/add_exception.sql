DELETE FROM exceptions
WHERE emp_id = $1
AND date = $2;

insert into exceptions 
(emp_id, date, type, shift, timeoff_id)
values
($1, $2, $3, $4, $5);

-- SELECT type, date, shift FROM exceptions
-- WHERE emp_id = $1;
