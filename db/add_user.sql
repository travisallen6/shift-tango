
INSERT INTO patterns
(emp_id, sun, mon, tue, wed, thu, fri, sat)
VALUES
($1, 'OFF', 'OFF', 'OFF', 'OFF', 'OFF', 'OFF', 'OFF' );

INSERT INTO users
(emp_id, mgr, last_name, first_name, gmail_user, position, doe)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING emp_id;
