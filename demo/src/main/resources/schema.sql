CREATE TABLE point(
    id serial primary key,
    x integer,
    y integer
);

CREATE TABLE usermaster(
    id serial primary key,
    username varchar(255),
    password varchar(255),
    userdescription varchar(255),
    photolink varchar(255),
    email varchar(255)
);

CREATE TABLE events(
    id INT(10) NOT NULL AUTO_INCREMENT,
    title varchar(255),
    timedate varchar(255),
    date varchar(255),
    location varchar(255),
    lat varchar(255),
    lng varchar(255),
    description varchar(255),
    author varchar(255),
    count integer,
    PRIMARY KEY(id)
);

CREATE TABLE attending(
--    id serial primary key,
    user_id integer,
    event_id integer,
    author varchar(255)
);