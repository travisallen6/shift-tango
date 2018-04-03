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
(205301, true, 'Allen', 'Travis', null, null, 'travisallen6', null, 'Ramp Manager', '2012-12-12', '123 Main St.', 'Salt Lake City', 'UT', null);