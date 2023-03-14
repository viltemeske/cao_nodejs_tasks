create table shirt2 (
	shirtId int4 unsigned primary key auto_increment,
	brand text not null,
    model text not null,
    size text('XS', 'S', 'M', 'L', 'XL') default 'XS',
    price decimal(4, 2) not null,
	cretedAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp
)