DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    emp_id integer primary key,
    mgr BOOLEAN,
    last_name VARCHAR(20),
    first_name VARCHAR(20),
    auth_id text,
    profile_pic text,
    gmail_user text,
    phone varchar(20),
    position varchar(20),
    doe date,
    address varchar(80),
    city varchar(20),
    state varchar(20),
    zip integer,
    email varchar(80)
);

insert into users
(emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email)
values
(205301, true, 'Allen', 'Travis', null, 'https://lh3.googleusercontent.com/-zR2_L45pjK4/AAAAAAAAAAI/AAAAAAAACSw/YL4xjs1PCvg/photo.jpg', 'travisallen6', '801-673-735-', 'Ramp Manager', '2012-12-12', '123 Main St.', 'Salt Lake City', 'UT', 84128, 'travisallen6@gmail.com'),
(696969, true, 'Corronado', 'Sagi', null, 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'scorronadodev', '385-313-7606', 'PSM', '2013-03-13', '456 Slinger St.', 'Sandy', 'UT', 84004, 'scorronadodev@gmail.com'),
(637712, true, 'Butcher', 'Clint', null, 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'cbutcherdev', '801-916-9903', 'RSM', '2014-04-14', '789 Plovdiv pl.', 'Draper', 'UT', 81006, 'cbutcherdev@gmail.com'),
(905541, false, 'Lorenzo', 'Kalima', null, 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'klorenzodev', '555-123-5656', 'FSA', '2015-05-15', '135 Marker st.', 'St. George', 'UT', 80034, 'klorenzodev@gmail.com'),
(537112, false, 'Gisa', 'Sega', null,'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'sgisadev', '555-666-3456', 'RSA', '2016-06-16', '246 Beaker St.', 'West Jordan', 'UT', 89685, 'sgisadev@gmail.com');


DROP TABLE IF EXISTS patterns;
create table patterns
(
    pattern_id serial primary key,
    emp_id integer,
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
('905541', 'OFF', 'OFF', '0900-1700', '0900-1700', '0900-1700', '0900-1700', 'OFF');

DROP TABLE IF EXISTS exceptions;
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




