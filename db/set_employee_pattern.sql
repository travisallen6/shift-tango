UPDATE patterns
SET sun = $2, mon = $3, tue = $4, wed = $5, thu = $6, fri = $7, sat = $8 
WHERE emp_id = $1
RETURNING *;
