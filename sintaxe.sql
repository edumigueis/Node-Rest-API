CREATE TABLE AlunosED (			
RA SMALLINT PRIMARY KEY,		
Nome VARCHAR(40) NOT NULL)		


CREATE TABLE Disciplinas (
Cod INT PRIMARY KEY,
Nome VARCHAR(40) NOT NULL)

CREATE TABLE Resultados (
RA SMALLINT,
Cod INT,
Nota FLOAT NOT NULL,
Frequencia FLOAT NOT NULL,
PRIMARY KEY (RA,Cod),
FOREIGN KEY (RA)
REFERENCES AlunosED(RA),	
FOREIGN KEY (Cod)							
REFERENCES Disciplinas(Cod))

CREATE TABLE MatriculasED (		
RA SMALLINT,					
Cod INT,						
PRIMARY KEY (RA,Cod),			
FOREIGN KEY (RA)				
REFERENCES AlunosED(RA),		
FOREIGN KEY (Cod)				
REFERENCES Disciplinas(Cod))	

select * from AlunosED
select * from Disciplinas	
select * from MatriculasED	
select * from Resultados	
