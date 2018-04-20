CREATE TABLE timeoff 
(
    timeoff_id SERIAL PRIMARY KEY,
    emp_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(120), 
    request_type VARCHAR(80)
);

INSERT INTO timeoff

 (emp_id, start_date, end_date, status, request_type)
 VALUES
(696969, '2018-04-20', '2018-04-21', 'SICK', 'Pending' ),
(696969, '2018-05-20', '2018-05-23', 'UTO', 'Pending' ),
(696969, '2018-05-28', '2018-04-29', 'VAC', 'Pending' ),

(637712, '2018-04-20', '2018-04-21', 'SICK', 'Pending' ),
(637712, '2018-05-20', '2018-05-23', 'UTO', 'Pending' ),
(637712, '2018-05-28', '2018-04-29', 'VAC', 'Pending' ),

(905541, '2018-04-20', '2018-04-21', 'SICK', 'Pending' ),
(905541, '2018-05-20', '2018-05-23', 'UTO', 'Pending' ),
(905541, '2018-05-28', '2018-04-29', 'VAC', 'Pending' ),

(537112, '2018-04-20', '2018-04-21', 'SICK', 'Pending' ),
(537112, '2018-05-20', '2018-05-23', 'UTO', 'Pending' ),
(537112, '2018-05-28', '2018-04-29', 'VAC', 'Pending' ),

(205301, '2018-04-20', '2018-04-21', 'SICK', 'Pending' ),
(205301, '2018-05-20', '2018-05-23', 'UTO', 'Pending' ),
(205301, '2018-05-28', '2018-04-29', 'VAC', 'Pending' );

