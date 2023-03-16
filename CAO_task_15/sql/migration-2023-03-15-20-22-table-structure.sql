create table item (
	itemId int4 unsigned primary key auto_increment,
	title text not null,
   	cretedAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp
)