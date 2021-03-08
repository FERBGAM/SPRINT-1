/*Criar banco de dados se não existir*/
create database if not exists ferbgam;
/*Seleciona banco de dados para uso*/
use ferbgam;
/*cria tabela empresas com respectivas colunas*/
create table empresas (
idEmpresa int primary key auto_increment,
CNPJ char(14),
Nome varchar(40),
Telefone varchar(40),
Responsavel varchar(40) ,
Endereco varchar(50),
servico varchar(10)
);
/*cria tabela sensorTemp com respectivas colunas*/
create table sensorTemp (
idSensor int primary key auto_increment,
TemperaturaD varchar(10),
TemperaturaM varchar (10),
Empresa varchar(40),
Sala varchar(40)
);
/*cria tabela salas com respectivas colunas*/
create table Salas (
idSala int primary key,
sensorTempID int,
sensorUmiID int,
sensorLumiID int
);
/*cria tabela sensorUmi com respectivas colunas*/
create table sensorUmi (
idSensor int primary key auto_increment,
UmidadeD varchar(10),
UmidadeM varchar (10),
Empresa varchar(40),
Sala varchar(40)
);
/*cria tabela sensorLumi com respectivas colunas*/
create table sensorLumi (
idSensor int primary key auto_increment,
LuminosidadeD varchar(10),
Empresa varchar(40),
Sala varchar(40)
);
/*Insere dados na tabela empresas*/
insert into empresas value
(null,'12384453982836','PREPTA','1143672440','João','Rua Doutor Pinto Flaquer 421','Medium'),
(null,'34721743127712','VALEMOBI','11952621278','Nelson','Rua Gen. Furtado do Nascimento 740','Premium'),
(null,'34783271823784','SAFRA','1155912170','Joseph','Rua Carneiro da Cunha 39','Medium'),
(null,'38293872103923','BANDTEC','1140028922','Vera','Rua Haddock Lobo 575','Premium'),
(null,'45328192383443','CODEBY','1130337273','Fellipe','Rua Haddock Lobo 684','Basic'),
(null,'54327812373217','ACCENTURE','1131228376','Leonardo',' Rua Alexandre Dumas 2051','Basic');
/*Insere dados na tabela salas*/
insert into salas values
 (1,6,1,null),
 (2,5,2,2),
 (3,4,3,null),
 (4,3,4,3),
 (5,2,null,null),
 (6,1,null,null);
/*Insere dados na tabela sensorLumi*/ 
 insert into sensorLumi values
 (null,'700','VALEMOBI',2),
 (null,'700','BANDTEC',4);
/*Insere dados na tabela sensortemp*/ 
insert into sensortemp values
(null,'23-25','24','ACCENTURE',6),
(null,'23-25','24','CODEBY',5),
(null,'23-25','24','BANDTEC',4),
(null,'23-25','24','SAFRA',3),
(null,'23-25','24','VALEMOBI',2),
(null,'23-25','24','PREPTA',1);
/*Insere dados na tabela sensortemp*/ 
insert into sensorumi values
(null,'50-70','60','PREPTA',1),
(null,'50-70','60','VALEMOBi',2),
(null,'50-70','60','SAFRA',3),
(null,'50-70','60','BANDTEC',4)
 ;
select * from empresas;
select * from sensorTemp;
select * from Salas;
select * from sensorUmi;
select * from sensorLumi;