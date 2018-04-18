INSERT INTO timeoff
(emp_id, start_date, end_date, status, reason, request_type)
VALUES 
($1, $2, $3, $4, $5, $6);