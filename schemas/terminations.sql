CREATE table terminations
(
    termination_id serial primary key,
    emp_id integer,
    reason varchar(240),
    termination_date date
);