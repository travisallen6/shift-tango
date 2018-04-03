update users
set auth_id = $2 , profile_pic = $3
where emp_id = $1
returning *;