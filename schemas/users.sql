CREATE TABLE users
(
    emp_id integer primary key,
    mgr BOOLEAN,
    last_name VARCHAR(120),
    first_name VARCHAR(120),
    auth_id text,
    profile_pic text,
    gmail_user text,
    phone varchar(120),
    position varchar(120),
    doe date,
    address varchar(240),
    city varchar(240),
    state varchar(120),
    zip varchar(240)
    email varchar(240)
);


insert into users
(emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email)
values
(205301, true, 'Allen', 'Travis', null, null, 'travisallen6', null, 'Ramp Manager', '2012-12-12', '123 Main St.', 'Salt Lake City', 'UT', '84044', null),
(696969, true, 'Corronado', 'Sagi', null, null, 'scorronadodev', null, 'PSM', '2013-03-13', '456 Slinger St.', 'Sandy', 'UT','84044', null),
(637712, true, 'Butcher', 'Clint', null, null, 'cbutcherdev', null, 'RSM', '2014-04-14', '789 Plovdiv pl.', 'Draper', 'UT','84044', null),
(905541, false, 'Lorenzo', 'Kalima', null, null, 'klorenzodev', null, 'FSA', '2015-05-15', '135 Marker st.', 'St. George', 'UT','84044', null),
(537112, false, 'Gisa', 'Sega', null, null, 'sgisadev', null, 'RSA', '2016-06-16', '246 Beaker St.', 'West Jordan', 'UT','84044', null);

insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email)
  values
  (357913, false, 'Schowalter', 'Jamey', null, 'https://s3.amazonaws.com/uifaces/faces/twitter/s4f1/128.jpg', 'jameyschowalter', '8013554666', 'Customer Service Representative', '2018-02-26', '135 Daisy Street', 'Salt Lake City', 'UT', '84000', 'jameyschowalter@fakeemail.com' ),
  (468024, false, 'Langworth', 'Catalina', null, 'https://s3.amazonaws.com/uifaces/faces/twitter/scottfeltham/128.jpg', 'clangworth', '5553258970', 'Customer Service Representative', '2018-03-23', '334 Walter Lane', 'Salt Lake City', 'UT', '84000'),
  (579135, false, 'Veum', 'Jerel', null, 'https://s3.amazonaws.com/uifaces/faces/twitter/vonachoo/128.jpg', 'jerelveum', '5557880034', 'Customer Service Representative', '2018-01-07', '492 Kraaft Street', 'Salt Lake City', 'UT', 84000, 'jerelveum@fakeemail.com'),
  (680246, false, 'ullrich', 'Beau', null, 'Ullrich, Beau, https://s3.amazonaws.com/uifaces/faces/twitter/tweetubhai/128.jpg', 'beauullrich', '5557894321', 'Customer Service Representative', '2012-09-08', '555 Rochester Blvd', 'Salt Lake City', 'UT', 84000, 'bullrich@fakeemail.com')