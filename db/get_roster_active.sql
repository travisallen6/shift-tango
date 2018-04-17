SELECT 
last_name, first_name, profile_pic, position, emp_id 
FROM users
WHERE emp_id NOT IN 
    (SELECT emp_id from TERMINATIONS )
ORDER BY last_name;
