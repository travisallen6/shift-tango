create table patterns
(
    pattern_id serial primary key,
    emp_id integer references users on delete cascade,
    sun varchar(10),
    mon varchar(10),
    tue varchar(10),
    wed varchar(10),
    thu varchar(10),
    fri varchar(10),
    sat varchar(10)
);

insert into patterns
(emp_id, sun, mon, tue, wed, thu, fri, sat)
values
('205301', '0400-1200', '0400-1200', '0400-1200', '0400-1200', 'OFF', 'OFF', 'OFF'),
('637712', '0600-1400', 'OFF', 'OFF', '0600-1400', '0600-1400', '0600-1400', '0600-1400'),
('696969', '0700-1500', '0700-1500', '0700-1500', '0700-1500', 'OFF', 'OFF', '0700-1500'),
('537112', '0800-1600', '0800-1600', '0800-1600', '0800-1600', '0800-1600', 'OFF', 'OFF'),
('905541', 'OFF', 'OFF', '0900-1700', '0900-1700', '0900-1700', '0900-1700', 'OFF')

select * from users
join patterns on users.emp_id = patterns.emp_id

insert into patterns
(emp_id, sun, mon, tue, wed, thu, fri, sat)
values 
(579135, '0500-1130', '0500-1130', '0500-1130', '0500-1130', 'OFF', 'OFF', '0500-1130'), 
(680246, '0800-1630', 'OFF', 'OFF', '0800-1630', '0800-1630', '0800-1630', '0800-1630'), 
(357913, 'OFF', '0745-1545', '0745-1545', '0745-1545', '0745-1545', '0745-1545', 'OFF'),
(468024, '1315-2315', '1315-2315', '1315-2315', 'OFF', 'OFF', '1315-2315', '1315-2315');