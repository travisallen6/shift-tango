UPDATE users
set profile_pic = $2
where emp_id = $1 and profile_pic is null;