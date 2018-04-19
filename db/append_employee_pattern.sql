select sun, mon, tue, wed, thu, fri, sat
from patterns
where emp_id = $1;

SELECT type, date, shift 
FROM exceptions
WHERE date >= $2 
AND date <= $3;