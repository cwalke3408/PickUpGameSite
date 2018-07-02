INSERT INTO point values
    (DEFAULT, 2, 2),
    (DEFAULT, 4, 2),
    (DEFAULT, 4, 4),
    (DEFAULT, 2, 4);

INSERT INTO usermaster values
       (DEFAULT, 'abc', '123', 'user descrip', 'photo link', 'cdw'),
       (DEFAULT, 'abc1', '123', 'user descrip', 'photo link', 'cdw1'),
       (DEFAULT, 'abc12', '123', 'user descrip', 'photo link', 'cdw12'),
       (DEFAULT, 'abc123', '123', 'user descrip', 'photo link', 'cdw123');

INSERT INTO events values
    (DEFAULT, 'event1', '7:00 PM', 'Wed Jun 13 2018','Clemson', '34.6760942', '-82.8364148', 'descrip', 'abc', 1),
    (DEFAULT, 'event2', '9:00 AM', 'Fri Jun 29 2018','Greenville', '34.8908379', '-82.29098189999999', 'descrip', 'abc', 1);
--    (DEFAULT, 'Disc Golf', '9:00 AM', 'Sat Jun 30 2018','270 Sanders Rd,Central,SC', '34.71140270000001', '-82.78254319999999', 'Looking for a playing partner to play a round with', 'abc1', 1);
--    (DEFAULT, 'PickUp Frisbee on Bowman?', '3:00 PM', 'Fri Jul 06 2018','Bowman Field,Clemson,SC', '34.6808433', '-82.83663039999999', 'Looking to get a pick up game after class.  Anyone interested?', 'abc1', 1);
--    (DEFAULT, 'Basketball after school', '3:30 PM', 'Thu Jul 05 2018','203 Corn Rd,Greenville,SC', '34.7909741', '-82.2884222', 'Group of us trying to get a game of 5 on 5 going', 'abc12', 1);
--    (DEFAULT, 'Round of Disc Golf', '4:00 PM', 'Thu Jul 10 2018','135 Old Hamilton Rd,Marietta,GA', '33.9564113', '	-84.66199999999999', 'Playing a round of disc golf.', 'abc123', 1);


INSERT INTO attending values
    (1, 1, 'abc'),
    (2, 1, 'abc'),
    (3, 1, 'abc'),
    (1, 2, 'abc'),
    (2, 2, 'abc'),
    (4, 2, 'abc');

