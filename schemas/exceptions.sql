create table exceptions
(
    exception_id serial primary key,
    emp_id integer,
    type varchar(10),
    date varchar(10),
    shift varchar(10)
)