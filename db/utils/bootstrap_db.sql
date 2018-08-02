DROP TABLE IF EXISTS terminations;
DROP TABLE IF EXISTS timeoff;
DROP TABLE IF EXISTS patterns;
DROP TABLE IF EXISTS commsettings;
DROP TABLE IF EXISTS users;
create table users (
	emp_id INTEGER PRIMARY KEY,
	mgr VARCHAR(50),
	last_name VARCHAR(50),
	first_name VARCHAR(50),
	auth_id VARCHAR(50),
	profile_pic TEXT,
	gmail_user VARCHAR(50),
	phone VARCHAR(50),
	position VARCHAR(50),
	doe DATE,
	address VARCHAR(50),
	city VARCHAR(16),
	state VARCHAR(50),
	zip INTEGER,
	email VARCHAR(50)
);

create table commsettings (
	commsettings_id	serial primary key,		
	sms	boolean DEFAULT false,		
	email boolean	DEFAULT false,		
	emp_id	integer	references users on delete cascade
);

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

CREATE TABLE timeoff 
(
    timeoff_id SERIAL PRIMARY KEY,
    emp_id INTEGER REFERENCES users ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(120), 
    request_type VARCHAR(80)
);

CREATE table terminations
(
    termination_id serial primary key,
    emp_id integer,
    reason varchar(240),
    termination_date date,
    last_name varchar(180),
    first_name varchar(180),
    position varchar(180),
    doe date,
    profile_pic text,
    phone varchar(80)
);

insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (439521, false, 'Betje', 'Emmalee', 'nwRxkurtUsV7Id', null, 'ebetje0', '2612294103', 'Editor', '2012-07-14', '20 Prairie Rose Park', 'West Valley City', 'UT', 84130, 'ebetje0@quantcast.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (891595, false, 'Crellim', 'Milly', 'csuQ3M9gf3IboZ', null, 'mcrellim1', '3292964668', 'Senior Developer', '2012-04-27', '17286 Glacier Hill Hill', 'Logan', 'UT', 84214, 'mcrellim1@yolasite.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (568700, false, 'Pammenter', 'Nicolea', 'qn2pyQ7pVOBkaJ', null, 'npammenter2', '9821595924', 'Account Coordinator', '2012-12-10', '541 Stoughton Park', 'American Fork', 'UT', 84483, 'npammenter2@soup.io');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (971815, false, 'Kivelle', 'Bliss', 'NtWPHeximkjath', null, 'bkivelle3', '7657981367', 'Web Designer I', '2015-03-16', '4788 Darwin Court', 'Kearns', 'UT', 84334, 'bkivelle3@icq.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (735205, false, 'Pownall', 'Rutledge', 'LQM4J8oVn0KSD5', null, 'rpownall4', '7855689723', 'Assistant Media Planner', '2012-05-06', '4036 Grasskamp Alley', 'Salt Lake City', 'UT', 84059, 'rpownall4@deliciousdays.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (489290, false, 'Beauman', 'Karin', 'WkcF8fLBOxnFjB', null, 'kbeauman5', '9809939659', 'Civil Engineer', '2017-11-23', '2 Parkside Drive', 'Salt Lake City', 'UT', 84136, 'kbeauman5@netlog.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (461127, false, 'Clitherow', 'Christina', 'VFnfZ6a6ASWgH8', null, 'cclitherow6', '7011090862', 'Product Engineer', '2013-08-01', '200 Mayfield Parkway', 'Draper', 'UT', 84242, 'cclitherow6@boston.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (299348, false, 'Bellerby', 'Vanni', 'ix6f0AgAf9Flkw', null, 'vbellerby7', '8671218430', 'Director of Sales', '2013-03-19', '84383 Nancy Pass', 'Leahi', 'UT', 84322, 'vbellerby7@sitemeter.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (421057, false, 'Lorroway', 'Chan', 'aNt6V6VYosyLD4', null, 'clorroway8', '2294803270', 'Food Chemist', '2012-07-02', '9018 Dunning Terrace', 'Salt Lake City', 'UT', 84121, 'clorroway8@istockphoto.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (938186, false, 'Hanshawe', 'Brigid', 'nwW9EfIl4BpIag', null, 'bhanshawe9', '6564448134', 'Research Assistant I', '2016-12-20', '48 Anzinger Center', 'Leahi', 'UT', 84312, 'bhanshawe9@reverbnation.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (350766, false, 'Rumens', 'Forbes', '4j0w8hUycBJxiI', null, 'frumensa', '7639551003', 'Account Executive', '2014-12-24', '454 Lillian Crossing', 'American Fork', 'UT', 84073, 'frumensa@lycos.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (345550, false, 'Pumfrey', 'Ernie', '9ReSHAOb18sYrO', null, 'epumfreyb', '1047964803', 'Senior Cost Accountant', '2014-11-22', '48945 Armistice Place', 'Draper', 'UT', 84231, 'epumfreyb@alexa.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (215056, false, 'Sidlow', 'Reinwald', 'z7aKinuspzb1Zq', null, 'rsidlowc', '9481351816', 'Programmer Analyst II', '2012-02-08', '3 Melvin Place', 'West Valley City', 'UT', 84252, 'rsidlowc@rambler.ru');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (768699, false, 'Eager', 'Roanna', '8t89q1vhZvwheS', null, 'reagerd', '4446205381', 'Junior Executive', '2013-01-17', '0779 Portage Lane', 'Salt Lake City', 'UT', 84262, 'reagerd@wired.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (818680, false, 'Canlin', 'Linda', 'OLoCB87dnbRSa0', null, 'lcanline', '3824067902', 'Editor', '2017-10-08', '86 Welch Crossing', 'American Fork', 'UT', 84059, 'lcanline@moonfruit.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (528392, false, 'Westby', 'Davin', 'Tt2bSLYpk2SjhU', null, 'dwestbyf', '4428616566', 'Recruiting Manager', '2013-03-07', '9888 Killdeer Way', 'American Fork', 'UT', 84005, 'dwestbyf@latimes.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (676673, false, 'MacNelly', 'Mortimer', 'SPUArCThf3AwcT', null, 'mmacnellyg', '6606055439', 'Accountant IV', '2014-01-06', '7943 Mifflin Parkway', 'Salt Lake City', 'UT', 84338, 'mmacnellyg@friendfeed.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (220367, false, 'Trevaskiss', 'Marni', 'oi9TtAW0VVVjd5', null, 'mtrevaskissh', '7051659865', 'Executive Secretary', '2015-06-12', '1 Bellgrove Lane', 'Provo', 'UT', 84116, 'mtrevaskissh@microsoft.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (386004, false, 'Marryatt', 'Ram', 'DciXSPiHmIDgQ7', null, 'rmarryatti', '5049320730', 'Assistant Professor', '2014-07-07', '3 Havey Lane', 'Leahi', 'UT', 84242, 'rmarryatti@networksolutions.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (676792, false, 'Dimbleby', 'Karl', '3AzQEgvlZBNKmh', null, 'kdimblebyj', '7344407370', 'Physical Therapy Assistant', '2012-02-22', '101 Hanover Drive', 'Draper', 'UT', 84006, 'kdimblebyj@webeden.co.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (759728, false, 'Woodyatt', 'Shirlene', 'XQTlQ4OnvhnhH8', null, 'swoodyattk', '3554915679', 'Help Desk Technician', '2017-06-25', '99 Fuller Plaza', 'Provo', 'UT', 84372, 'swoodyattk@desdev.cn');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (883100, false, 'Wallege', 'Gradeigh', 'pSNQjA6NvWhBZq', null, 'gwallegel', '9288151018', 'Assistant Media Planner', '2014-07-30', '13629 Northridge Pass', 'Kearns', 'UT', 84353, 'gwallegel@typepad.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (412279, false, 'Lawless', 'Salaidh', 'eORBuEoUABdm0g', null, 'slawlessm', '9444780383', 'Help Desk Technician', '2015-06-17', '69076 Elgar Place', 'Leahi', 'UT', 84231, 'slawlessm@usda.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (831098, false, 'Ibberson', 'Shirley', 'Vl1uDTOKmN9bjF', null, 'sibbersonn', '3175455081', 'Accounting Assistant IV', '2015-11-10', '7 Warrior Plaza', 'Kearns', 'UT', 84092, 'sibbersonn@odnoklassniki.ru');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (572142, false, 'Brucker', 'Jarrid', 'SreZX29R5XdgwV', null, 'jbruckero', '6789679596', 'Help Desk Technician', '2017-02-20', '73279 Loomis Alley', 'Logan', 'UT', 84218, 'jbruckero@aboutads.info');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (476453, false, 'Vousden', 'Hazel', 'AR14yXcewo5tfI', null, 'hvousdenp', '7354764323', 'Automation Specialist III', '2016-03-25', '520 Thompson Hill', 'Provo', 'UT', 84033, 'hvousdenp@nhs.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (877773, false, 'Bilham', 'Theresa', 'eNMc9Hv806ld3u', null, 'tbilhamq', '7599492025', 'Help Desk Technician', '2015-02-23', '519 Grayhawk Hill', 'Provo', 'UT', 84416, 'tbilhamq@nbcnews.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (775155, false, 'Lealle', 'Alisha', 'gCOEMpMURtYzbe', null, 'alealler', '5053266278', 'Operator', '2014-07-09', '72558 Grasskamp Road', 'Provo', 'UT', 84063, 'alealler@house.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (865869, false, 'Cuerdale', 'Junina', 'meknmbLcEKW1KZ', null, 'jcuerdales', '9593033511', 'Design Engineer', '2014-07-16', '30234 Fairview Alley', 'Draper', 'UT', 84006, 'jcuerdales@tmall.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (868520, false, 'Glaves', 'Giacobo', 'O12YKHRmA6pp0f', null, 'gglavest', '8915146353', 'Automation Specialist IV', '2014-10-29', '1 Ludington Park', 'Provo', 'UT', 84151, 'gglavest@wordpress.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (747487, false, 'Smithson', 'Janetta', 'ShLNxyuNEg92k2', null, 'jsmithsonu', '1137943592', 'VP Quality Control', '2017-03-13', '35956 Lawn Alley', 'Logan', 'UT', 84184, 'jsmithsonu@printfriendly.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (335294, false, 'Wyatt', 'Kirstyn', 'ORjbEVIF8Qr7gQ', null, 'kwyattv', '1683901671', 'Nurse', '2012-03-14', '1453 Stone Corner Hill', 'Logan', 'UT', 84493, 'kwyattv@angelfire.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (943037, false, 'Aslen', 'Karlyn', 'Uewu7gFJgO3KvJ', null, 'kaslenw', '1645952879', 'Design Engineer', '2013-03-11', '092 Pawling Crossing', 'Salt Lake City', 'UT', 84256, 'kaslenw@theguardian.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (470164, false, 'Paulitschke', 'Eilis', '3kamG4fDdgrrLt', null, 'epaulitschkex', '8098263618', 'Pharmacist', '2018-02-10', '46449 High Crossing Street', 'Leahi', 'UT', 84317, 'epaulitschkex@va.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (361138, false, 'Bore', 'Millisent', 'YATIQ75H50Ezga', null, 'mborey', '7346797841', 'Senior Quality Engineer', '2013-05-07', '466 Johnson Park', 'Draper', 'UT', 84356, 'mborey@digg.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (155895, false, 'Bento', 'Lemuel', 'dbNu6cfjeQ7myP', null, 'lbentoz', '4822839453', 'Payment Adjustment Coordinator', '2012-04-23', '15634 Fair Oaks Center', 'Logan', 'UT', 84154, 'lbentoz@reuters.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (966405, false, 'Corbally', 'Courtenay', 'pxKMVJZXZX23Jc', null, 'ccorbally10', '6515951997', 'Staff Scientist', '2013-10-09', '368 Bellgrove Alley', 'American Fork', 'UT', 84349, 'ccorbally10@adobe.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (951237, false, 'Ilyenko', 'Perkin', 'mxq9z5696HuEyQ', null, 'pilyenko11', '1641593296', 'Community Outreach Specialist', '2015-08-18', '92217 Maryland Lane', 'West Valley City', 'UT', 84214, 'pilyenko11@whitehouse.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (933380, false, 'Baiden', 'Chrissie', '5vJ9iW1dR3h1Ho', null, 'cbaiden12', '5441471407', 'Chemical Engineer', '2014-05-02', '97 Pepper Wood Parkway', 'Kearns', 'UT', 84162, 'cbaiden12@tripadvisor.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (225758, false, 'Dongate', 'Licha', 'ZpX10WGC8hOV9Z', null, 'ldongate13', '3075254126', 'Senior Cost Accountant', '2012-06-22', '23 Texas Terrace', 'Leahi', 'UT', 84479, 'ldongate13@wunderground.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (336404, false, 'Taylo', 'Toddie', '5F59BSOqtlbVYg', null, 'ttaylo14', '2722246551', 'Software Test Engineer II', '2014-01-12', '36488 Huxley Lane', 'Draper', 'UT', 84373, 'ttaylo14@facebook.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (294412, false, 'Dahlback', 'Anya', 'WTaqrmFY0ZNC9y', null, 'adahlback15', '8171332184', 'Analog Circuit Design manager', '2013-11-12', '54 Bultman Avenue', 'West Valley City', 'UT', 84111, 'adahlback15@dailymail.co.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (266289, false, 'Crickmer', 'Jacinthe', 'FU375R4TXklgVO', null, 'jcrickmer16', '2332052134', 'Associate Professor', '2013-08-31', '64247 Troy Crossing', 'Draper', 'UT', 84156, 'jcrickmer16@ibm.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (757109, false, 'Southcomb', 'Doroteya', '21v3EXi1aEE9z4', null, 'dsouthcomb17', '3899569492', 'Information Systems Manager', '2018-02-21', '268 Boyd Lane', 'Kearns', 'UT', 84060, 'dsouthcomb17@cbc.ca');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (891304, false, 'O'' Reagan', 'Lauritz', 'j8qDZFiw2nbTZc', null, 'loreagan18', '1176359614', 'Accounting Assistant I', '2017-09-11', '6459 Birchwood Court', 'Leahi', 'UT', 84205, 'loreagan18@sina.com.cn');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (342099, false, 'Brookwell', 'Julietta', 'dmBo7X7HGwE4Xt', null, 'jbrookwell19', '9651687603', 'Business Systems Development Analyst', '2012-11-06', '7 Prairie Rose Alley', 'Draper', 'UT', 84205, 'jbrookwell19@comcast.net');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (237896, false, 'Mathiasen', 'Merilyn', 'fE6dO2UXC2nOhp', null, 'mmathiasen1a', '8157306584', 'VP Quality Control', '2016-10-08', '6750 Continental Hill', 'Salt Lake City', 'UT', 84375, 'mmathiasen1a@opera.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (332410, false, 'Sofe', 'Adda', 'rFtXeHz5RCOLe0', null, 'asofe1b', '8173336577', 'Structural Engineer', '2013-08-28', '14461 Atwood Way', 'Kearns', 'UT', 84418, 'asofe1b@fotki.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (401778, false, 'Confort', 'Channa', 'V0ajdZNYwiK3ws', null, 'cconfort1c', '1814741817', 'Senior Quality Engineer', '2016-10-23', '7 Kim Plaza', 'Salt Lake City', 'UT', 84248, 'cconfort1c@exblog.jp');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (542156, false, 'Nafziger', 'Marvin', 'Nl4capgv22TLm6', null, 'mnafziger1d', '4633026990', 'Research Nurse', '2015-07-04', '90 Gerald Street', 'Provo', 'UT', 84457, 'mnafziger1d@tripadvisor.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (203013, false, 'Prentice', 'Tommy', 'ZVTcUxMsjLIqet', 'https://s3.amazonaws.com/uifaces/faces/twitter/mvdheuvel/128.jpg', 'tprentice1e', '7007882844', 'Customer Service Representative', '2017-07-26', '3310 Talmadge Lane', 'Provo', 'UT', 84215, 'tprentice1e@businessweek.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (413177, false, 'Grima', 'Hyacintha', 'CEdvFdN37T1sJJ', null, 'hgrima1f', '5805609845', 'Tax Accountant', '2013-04-03', '0629 Carioca Drive', 'Salt Lake City', 'UT', 84432, 'hgrima1f@ibm.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (712223, false, 'Philpotts', 'Rustie', 'I9wUhHxQHn8TwS', null, 'rphilpotts1g', '9012972040', 'Environmental Specialist', '2017-07-24', '9511 Dakota Hill', 'Salt Lake City', 'UT', 84266, 'rphilpotts1g@wikimedia.org');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (593397, false, 'Jubb', 'Sherill', 'bmyyEy3z8GY23f', null, 'sjubb1h', '5202104054', 'Community Outreach Specialist', '2012-07-28', '3590 Lakewood Junction', 'West Valley City', 'UT', 84254, 'sjubb1h@nih.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (127994, false, 'O''Criane', 'Nobe', 'yyZxyPhRKaevkL', null, 'nocriane1i', '4905066204', 'Paralegal', '2017-03-17', '66674 Barnett Trail', 'Logan', 'UT', 84388, 'nocriane1i@ca.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (204242, false, 'O''Fairy', 'Lusa', 'JxYoOaWtIspmPT', null, 'lofairy1j', '1567253032', 'VP Quality Control', '2013-10-07', '24 Gerald Court', 'Leahi', 'UT', 84342, 'lofairy1j@netscape.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (543759, false, 'Svanetti', 'Nettie', 'dfJI4HpL7ju4V3', null, 'nsvanetti1k', '3132921962', 'Technical Writer', '2015-06-12', '878 Straubel Crossing', 'Salt Lake City', 'UT', 84368, 'nsvanetti1k@dailymail.co.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (110857, false, 'Tobias', 'Guenna', 'dQsM8YYVS4mcbt', null, 'gtobias1l', '5809715849', 'Senior Financial Analyst', '2015-11-14', '9 Crownhardt Crossing', 'Draper', 'UT', 84424, 'gtobias1l@mozilla.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (375216, false, 'Haszard', 'Cal', '5ATjjGcWRMrFqz', null, 'chaszard1m', '9673092391', 'Actuary', '2017-08-23', '66224 Monterey Junction', 'Kearns', 'UT', 84468, 'chaszard1m@behance.net');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (960558, false, 'Bullent', 'Prissie', '3jda2Id9MdHMwc', null, 'pbullent1n', '8046881355', 'Programmer Analyst II', '2014-04-19', '17171 Corscot Court', 'West Valley City', 'UT', 84311, 'pbullent1n@ocn.ne.jp');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (770426, false, 'Entreis', 'Chelsea', '5kruQd5M2NBmDq', null, 'centreis1o', '9884808968', 'Senior Cost Accountant', '2014-02-18', '4 Monica Parkway', 'Provo', 'UT', 84168, 'centreis1o@twitter.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (552716, false, 'Tomadoni', 'Graehme', 'cu8A5xUdNa1ZGg', null, 'gtomadoni1p', '7987789575', 'Assistant Professor', '2014-11-13', '5 Dorton Circle', 'Provo', 'UT', 84254, 'gtomadoni1p@stumbleupon.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (778150, false, 'Kindell', 'Bing', '2A6FC3vNn6zhL7', null, 'bkindell1q', '6071023251', 'Accountant II', '2017-09-14', '05 Lakeland Circle', 'Logan', 'UT', 84387, 'bkindell1q@bizjournals.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (497755, false, 'Snary', 'Yoko', 'tndEGjGHjDzahl', null, 'ysnary1r', '8734712245', 'Teacher', '2016-03-07', '664 Trailsway Pass', 'Provo', 'UT', 84108, 'ysnary1r@lycos.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (425217, false, 'Pullen', 'Jamison', 'XZpZTsZ09SJqsM', null, 'jpullen1s', '3857600883', 'Senior Developer', '2016-12-21', '35 Harper Park', 'Logan', 'UT', 84000, 'jpullen1s@disqus.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (103419, true, 'Rivard', 'Ellynn', 'Y3zDqsOtL4p6F6', 'https://s3.amazonaws.com/uifaces/faces/twitter/oksanafrewer/128.jpg', 'erivard1t', '1477102147', 'General Manager', '2017-05-30', '12696 Scoville Street', 'Kearns', 'UT', 84170, 'erivard1t@apple.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (575422, false, 'McGeoch', 'Athene', 'bHyamptvL6xDB9', null, 'amcgeoch1u', '7963009585', 'Environmental Tech', '2014-05-11', '75167 Bunker Hill Crossing', 'Draper', 'UT', 84262, 'amcgeoch1u@whitehouse.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (366338, false, 'Dumbar', 'Errick', 'Mt18NUXvUW48Me', 'https://s3.amazonaws.com/uifaces/faces/twitter/vimarethomas/128.jpg', 'edumbar1v', '7916878709', 'Business Systems Development Analyst', '2012-05-04', '95 Coolidge Crossing', 'West Valley City', 'UT', 84047, 'edumbar1v@cdc.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (128374, false, 'Bittany', 'Malorie', 'rOd4FjOVemB8i1', null, 'mbittany1w', '8126353099', 'Computer Systems Analyst I', '2014-08-30', '02507 Walton Park', 'American Fork', 'UT', 84463, 'mbittany1w@gov.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (918246, false, 'MacCourt', 'Aeriel', 'oWFt6gaWU7sXeO', null, 'amaccourt1x', '9077755842', 'Community Outreach Specialist', '2014-10-23', '8 David Center', 'Salt Lake City', 'UT', 84006, 'amaccourt1x@amazon.de');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (667161, false, 'Stubbings', 'Ilka', 'NHXqX56ae5YBWz', null, 'istubbings1y', '8861618931', 'Financial Advisor', '2016-10-11', '42 Moulton Parkway', 'Provo', 'UT', 84297, 'istubbings1y@sciencedaily.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (562996, false, 'Kulicke', 'Zane', 'ivqt2e51Dg2m7u', null, 'zkulicke1z', '2384387682', 'Technical Writer', '2015-03-18', '39253 East Place', 'Leahi', 'UT', 84415, 'zkulicke1z@example.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (549887, false, 'Gruby', 'Mame', '1YYTeaMYmg3a8i', null, 'mgruby20', '4981388879', 'Associate Professor', '2017-01-22', '9 Dahle Crossing', 'Logan', 'UT', 84430, 'mgruby20@baidu.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (175211, false, 'Ridulfo', 'Sherwood', 'UYWFDPiZ44eq0H', null, 'sridulfo21', '6435160997', 'Desktop Support Technician', '2017-08-14', '479 2nd Street', 'Kearns', 'UT', 84341, 'sridulfo21@usa.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (353477, false, 'Bonifazio', 'Jodi', 'fUS8DhgegcJMgY', null, 'jbonifazio22', '8375706811', 'Senior Developer', '2014-05-04', '6 Bluestem Parkway', 'Provo', 'UT', 84090, 'jbonifazio22@imdb.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (825466, false, 'Parnby', 'Jerrie', 'enuEFjZALdHJAt', null, 'jparnby23', '4695164819', 'Account Coordinator', '2014-10-06', '927 Lindbergh Junction', 'Salt Lake City', 'UT', 84024, 'jparnby23@japanpost.jp');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (336823, false, 'Eyers', 'Burtie', 'nmh6dzXYvIfqZK', null, 'beyers24', '8005340264', 'Environmental Tech', '2014-09-13', '535 Darwin Alley', 'Leahi', 'UT', 84117, 'beyers24@ifeng.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (533917, false, 'Ehlerding', 'Kyle', 'BjTFNutiXWN074', null, 'kehlerding25', '3839334736', 'Senior Cost Accountant', '2014-10-16', '69189 Wayridge Crossing', 'Salt Lake City', 'UT', 84031, 'kehlerding25@youtu.be');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (628987, false, 'Fernando', 'Godart', 'loM5Ii6vH6YPu6', null, 'gfernando26', '1872540209', 'Associate Professor', '2015-01-24', '1 Morrow Place', 'American Fork', 'UT', 84240, 'gfernando26@goodreads.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (145436, false, 'Gately', 'Malinde', 'bk3poPxiWMMRKz', null, 'mgately27', '8693902044', 'Social Worker', '2017-10-22', '0 Alpine Trail', 'Provo', 'UT', 84384, 'mgately27@google.ru');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (419942, false, 'Reedyhough', 'Kellby', 'gl7cwrfn808O7S', null, 'kreedyhough28', '7615694312', 'Analog Circuit Design manager', '2013-04-07', '5 Dakota Parkway', 'American Fork', 'UT', 84146, 'kreedyhough28@nasa.gov');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (442078, false, 'Chettle', 'Sephira', 'ybBbdBTkVxpKpY', null, 'schettle29', '7738340401', 'Assistant Media Planner', '2012-01-20', '554 Ridgeview Terrace', 'Provo', 'UT', 84364, 'schettle29@e-recht24.de');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (728656, false, 'McAllister', 'Rob', 'wPNjGoyqQRXjxi', null, 'rmcallister2a', '3751057153', 'Help Desk Technician', '2012-04-25', '258 Anthes Hill', 'West Valley City', 'UT', 84382, 'rmcallister2a@guardian.co.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (121115, false, 'Woodcraft', 'Bogart', 'jioczB0zn62ypz', null, 'bwoodcraft2b', '4406275885', 'Human Resources Assistant III', '2014-08-14', '0 Golf View Center', 'American Fork', 'UT', 84358, 'bwoodcraft2b@amazon.co.uk');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (669255, false, 'Keeling', 'Broderic', 'Ie3BwsPoTjJWTF', null, 'bkeeling2c', '4261099965', 'Actuary', '2015-03-16', '4327 Village Green Place', 'Draper', 'UT', 84093, 'bkeeling2c@xrea.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (694269, false, 'Acuna', 'Ethelin', 'hjx4W7Z9f760AW', null, 'eacuna2d', '4132377369', 'Executive Secretary', '2017-04-13', '0940 Scoville Avenue', 'Logan', 'UT', 84406, 'eacuna2d@lulu.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (105930, false, 'Middle', 'Charity', 'Z12A6351kR5ptW', null, 'cmiddle2e', '3102557048', 'Staff Scientist', '2014-10-17', '2083 Packers Road', 'Kearns', 'UT', 84080, 'cmiddle2e@webmd.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (600744, false, 'Lippiello', 'Erminie', 'pbXPRgpJ3Guh4T', null, 'elippiello2f', '2367418546', 'Civil Engineer', '2015-12-22', '7910 Glendale Trail', 'Salt Lake City', 'UT', 84415, 'elippiello2f@amazon.co.jp');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (871531, false, 'Schruyer', 'Ravid', 'aBeedD5DaBwuan', null, 'rschruyer2g', '2936055561', 'Human Resources Manager', '2017-07-12', '099 Sunfield Pass', 'Salt Lake City', 'UT', 84203, 'rschruyer2g@wiley.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (579910, false, 'Coslitt', 'Shane', 'TbfmF2mSDhyDJh', null, 'scoslitt2h', '1866271133', 'Paralegal', '2015-05-19', '9242 Parkside Terrace', 'Provo', 'UT', 84452, 'scoslitt2h@feedburner.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (938054, false, 'Rijkeseis', 'Brok', 'RsSYAdWBPQ8bFp', null, 'brijkeseis2i', '7062337173', 'Office Assistant III', '2012-02-01', '3512 Washington Crossing', 'Kearns', 'UT', 84262, 'brijkeseis2i@multiply.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (625106, false, 'Duckham', 'Leticia', 'K52VCGrLWhBat6', null, 'lduckham2j', '3025325397', 'Environmental Specialist', '2016-02-10', '6764 Doe Crossing Alley', 'West Valley City', 'UT', 84469, 'lduckham2j@storify.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (888435, false, 'Aisthorpe', 'Marquita', '3wHi3E07e1DBb0', null, 'maisthorpe2k', '2029561188', 'Engineer III', '2014-02-22', '4 Bartelt Trail', 'Draper', 'UT', 84166, 'maisthorpe2k@tripadvisor.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (637198, false, 'Shearn', 'Alicia', 'wq0yYE17u3mX85', null, 'ashearn2l', '4994248474', 'Operator', '2013-01-12', '5770 Manufacturers Avenue', 'West Valley City', 'UT', 84079, 'ashearn2l@pen.io');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (761463, false, 'Butters', 'Barb', 'TmE3XSl1pBTenJ', null, 'bbutters2m', '6591078955', 'Health Coach II', '2016-04-26', '3130 Anhalt Avenue', 'Kearns', 'UT', 84204, 'bbutters2m@photobucket.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (234038, false, 'Connick', 'Robers', '73Fk6kBOjv4Wa3', null, 'rconnick2n', '6954011102', 'Senior Editor', '2012-01-30', '89249 Pine View Court', 'West Valley City', 'UT', 84497, 'rconnick2n@disqus.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (866688, false, 'Grieves', 'Lars', 'BwuxPpvZBF3LYM', null, 'lgrieves2o', '5661770499', 'Dental Hygienist', '2017-01-11', '677 Lyons Alley', 'Leahi', 'UT', 84181, 'lgrieves2o@cyberchimps.com');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (541871, false, 'Sorbie', 'Wilek', 'm6nnmszMyHqY7i', null, 'wsorbie2p', '9918459071', 'Software Test Engineer I', '2017-12-12', '4420 Coolidge Center', 'Salt Lake City', 'UT', 84438, 'wsorbie2p@oaic.gov.au');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (311309, false, 'Cutten', 'Noellyn', 'cpfEmdwvKj8C2W', null, 'ncutten2q', '4768597672', 'Operator', '2014-12-13', '0811 Prentice Pass', 'West Valley City', 'UT', 84386, 'ncutten2q@unblog.fr');
insert into users (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email) values (971611, false, 'Piwall', 'Ertha', '4VdcjQ5mwftmBj', null, 'epiwall2r', '3936535256', 'Pharmacist', '2018-02-10', '49 Lerdahl Point', 'American Fork', 'UT', 84421, 'epiwall2r@newsvine.com');

SELECT *
FROM users;