create table car (
	carId int4 unsigned primary key auto_increment,
	title text not null,
	image text not null,
	price decimal(6,0) not null,
	numberplates varchar(16) not null,
   	cretedAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp
)