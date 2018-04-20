UPDATE timeoff
SET status = $2, reason = $3
WHERE timeoff_id = $1;


SELECT t.timeoff_id, t.start_date, t.end_date, t.status, t.reason, t.request_type, u.emp_id, u.last_name, u.first_name, u.profile_pic, u.position, 
-- e.exception_id, e.type, e.date, e.shift, 
p.pattern_id, p.sun, p.mon, p.tue, p.wed, p.thu, p.fri, p.sat  
FROM timeoff t
JOIN users u
ON t.emp_id = u.emp_id
JOIN patterns p
on t.emp_id = p.emp_id
ORDER BY start_date;

