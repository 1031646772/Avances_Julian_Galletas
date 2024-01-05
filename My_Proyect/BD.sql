Create database Galletas_y_Hojaldres;
use Galletas_y_Hojaldres;
create table User(
	Id_user int primary key auto_increment,
	Nombre varchar(50) not null,
	Email varchar (70) unique not null,
	Contrasena varchar (80) not null
);
create table Producto(
	Id_Producto int primary key auto_increment,
	Imagen NVARCHAR(255),
	Nombre Varchar(70),
	Descripcion Varchar(255),
    Estado enum ("Activo", "Inactivo") default "Activo"
);
select * from Producto;
