SELECT timeoff_id, start_date, end_date, status, reason, request_type
FROM timeoff
WHERE emp_id = $1