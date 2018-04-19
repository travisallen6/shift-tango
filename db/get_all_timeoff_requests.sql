SELECT t.timeoff_id, t.start_date, t.end_date, t.status, t.reason, t.request_type, u.emp_id, u.last_name, u.first_name, u.profile_pic, u.position 
FROM timeoff t
JOIN users u
ON t.emp_id = u.emp_id
ORDER BY start_date;