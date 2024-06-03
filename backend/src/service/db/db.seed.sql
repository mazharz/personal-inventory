drop table item if exists;
drop table category if exists;

create table category (
	id serial primary key,
	name varchar(250) not null,
	parent_id int references category(id) on delete cascade
);

create table item (
	id serial primary key,
	name varchar(250) not null,
	category_id int references category(id) on delete set null
);

insert into category (name, parent_id)
values
	('clothes', null),
	('t-shirt', 1),
	('pants', 1);

insert into item (name, category_id)
values
	('navy blue adidas', 1),
	('yellow polo', 1),
	('black cotton', 2),
	('brown cotton', 2);
