create table exceptions
(
    exception_id serial primary key,
    emp_id integer,
    type varchar(10),
    date varchar(10),
    shift varchar(10)
);

INSERT INTO exceptions
values
(emp_id, type, date, shift)
(205301, 'Trade', '2018-04-05', '0400-1200')
(205301, 'UTO', '2018-04-07', 'OFF')
(205301, 'UTO', '2018-04-01', 'OFF')