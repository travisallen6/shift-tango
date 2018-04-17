SELECT u.emp_id, u.last_name, u.first_name, u.mgr, u.doe, u.profile_pic, u.phone, u.position, u.address, u.city, u.state, u.email, u.zip, p.sun, p.mon, p.tue, p.wed, p.thu, p.fri, p.sat   
FROM users u
JOIN patterns p ON u.emp_id = p.emp_id
WHERE u.emp_id = $1