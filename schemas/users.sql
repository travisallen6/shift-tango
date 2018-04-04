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
    email varchar(80)
);


insert into users
(emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, email)
values
(205301, true, 'Allen', 'Travis', null, null, 'travisallen6', null, 'Ramp Manager', '2012-12-12', '123 Main St.', 'Salt Lake City', 'UT', null),
(696969, true, 'Corronado', 'Sagi', null, null, 'scorronadodev', null, 'PSM', '2013-03-13', '456 Slinger St.', 'Sandy', 'UT', null),
(637712, true, 'Butcher', 'Clint', null, null, 'cbutcherdev', null, 'RSM', '2014-04-14', '789 Plovdiv pl.', 'Draper', 'UT', null),
(905541, false, 'Lorenzo', 'Kalima', null, null, 'klorenzodev', null, 'FSA', '2015-05-15', '135 Marker st.', 'St. George', 'UT', null),
(537112, false, 'Gisa', 'Sega', null, null, 'sgisadev', null, 'RSA', '2016-06-16', '246 Beaker St.', 'West Jordan', 'UT', null);