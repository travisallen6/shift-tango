CREATE table terminations
(
    termination_id serial primary key,
    emp_id integer,
    reason varchar(240),
    termination_date date
    last_name varchar(180),
    first_name varchar(180),
    position varchar(180),
    doe date,
    profile_pic text,
    phone varchar(80);
);

alter table terminations
ADD COLUMN
last_name varchar(180),
ADD COLUMN
first_name varchar(180),
ADD COLUMN
position varchar(180),
ADD COLUMN
doe date,
ADD COLUMN
profile_pic text,
ADD COLUMN
phone varchar(80);
