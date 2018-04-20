create table exceptions
(
    exception_id serial primary key,
    emp_id integer,
    type varchar(10),
    date varchar(10),
    shift varchar(10)
);

INSERT INTO exceptions
(emp_id, type, date, shift)
values
(205301, 'Trade', '2018-04-05', '0400-1200'),
(205301, 'UTO', '2018-04-07', 'OFF'),
(205301, 'UTO', '2018-04-01', 'OFF');

INSERT INTO exceptions
(emp_id, type, date, shift)
values
(696969, 'Trade', '2018-04-05', '0400-1200'),
(696969, 'UTO', '2018-04-07', 'OFF'),
(696969, 'UTO', '2018-04-01', 'OFF');

INSERT INTO exceptions
(emp_id, type, date, shift)
values
(63712, 'Trade', '2018-04-05', '0400-1200'),
(63712, 'UTO', '2018-04-07', 'OFF'),
(63712, 'UTO', '2018-04-01', 'OFF');

INSERT INTO exceptions
(emp_id, type, date, shift)
values
(905541, 'Trade', '2018-04-05', '0400-1200'),
(905541, 'UTO', '2018-04-07', 'OFF'),
(905541, 'UTO', '2018-04-01', 'OFF');

INSERT INTO exceptions
(emp_id, type, date, shift)
values
(537112, 'Trade', '2018-04-05', '0400-1200'),
(537112, 'UTO', '2018-04-07', 'OFF'),
(537112, 'UTO', '2018-04-01', 'OFF');


insert into exceptions

emp_id, type, date, shift, timeoff_id

'537112', 'UTO', '2018-04-21', 'OFF', null
'537112', 'OT', '2018-04-25', '0400-1200', null
'537112', 'TRADE', '2018-04-26', '0800-1200', null
'696969', 'UTO', '2018-04-22', 'OFF', null
'696969', 'OT', '2018-04-27', '0400-1200', null
'696969', 'TRADE', '2018-04-28', '0800-1200', null
'905541', 'UTO', '2018-04-23', 'OFF', null
'905541', 'OT', '2018-04-29', '0800-1200', null
'905541', 'TRADE', '2018-04-30', '0400-1200', null
'637712', 'UTO', '2018-04-24', 'OFF', null
'637712', 'OT', '2018-05-01', '0400-1200', null
'637712', 'TRADE', '2018-05-01', '0800-1200', null