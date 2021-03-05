Create database Ferbgam;
use ferbgam;
Create table Empresas (
CNPJ char(14) primary key,
Nome Varchar(40),
Telefone varchar(11),
Responsavel varchar(40),
Endereco varchar(40),
Servico varchar(40)
);
Insert into empresas value
('38293872103923','BANDTEC','1140028922','Vera','Rua Haddock Lobo 575','Premium');
select*from empresas;
Insert into empresas value
('12384453982836','PREPTA','1143672440','João','Rua Doutor Pinto Flaquer 421','Medium'),
('54327812373217','ACCENTURE','1131228376','Leonardo',' Rua Alexandre Dumas 2051','Basic');
