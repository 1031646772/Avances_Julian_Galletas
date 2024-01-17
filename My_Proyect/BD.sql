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
insert into User (Nombre, Email, Contrasena) values ("Julian Peralta", "Juliperalta1306@gmail.com", "JulianPeralta123");

INSERT INTO Producto (Imagen, Nombre, Descripcion, Estado) VALUES
('https://res.cloudinary.com/dskllufl9/image/upload/v1705511341/q9s8wstmwi5rx17y21rk.jpg', 'Galletas de Chocolate Deluxe', 'Deliciosas galletas rellenas de trozos de chocolate belga. Perfectas para acompañar tu café o té.', 'Activo'),
('https://res.cloudinary.com/dskllufl9/image/upload/v1705511341/q9s8wstmwi5rx17y21rk.jpg', 'Galletas de Avena y Pasas', 'Galletas saludables con avena, pasas jugosas y un toque de canela. Un snack perfecto para mantener tu energía durante el día.', 'Activo'),
('https://res.cloudinary.com/dskllufl9/image/upload/v1705511341/q9s8wstmwi5rx17y21rk.jpg', 'Galletas de Mantequilla de Maní', 'Irresistibles galletas con un centro suave de mantequilla de maní. Una combinación perfecta de sabores dulces y salados.', 'Inactivo'),
-- ... (continuar con descripciones para otros productos)
('https://res.cloudinary.com/dskllufl9/image/upload/v1705511341/q9s8wstmwi5rx17y21rk.jpg', 'Galletas de Avena y Chocolate Blanco', 'Galletas crujientes con copos de avena y chips de chocolate blanco. Una deliciosa opción para los amantes del chocolate.', 'Activo'),
('https://res.cloudinary.com/dskllufl9/image/upload/v1705511341/q9s8wstmwi5rx17y21rk.jpg', 'Galletas de Miel y Almendras', 'Galletas endulzadas con miel natural y enriquecidas con almendras tostadas. El equilibrio perfecto entre dulce y crujiente.', 'Inactivo');