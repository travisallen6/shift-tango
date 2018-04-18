CREATE TABLE timeoff 
(
    timeoff_id SERIAL PRIMARY KEY,
    emp_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(120), 
    request_type VARCHAR(80)
);