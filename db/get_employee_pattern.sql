SELECT u.last_name, u.first_name, u.emp_id, u.Profile_pic, p.sun, p.mon, p.tue, p.wed, p.thu, p.fri, p.sat FROM patterns p
JOIN users u ON u.emp_id = p.emp_id
WHERE u.emp_id = $1