DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employees
(
    id INT NOT NULL
    AUTO_INCREMENT,	
firstName VARCHAR
    (30)NULL,
lastName  VARCHAR
    (30) NULL,
roleId INT NOT NULL, 
managerId INT NOT NULL,
 PRIMARY KEY
    (id)
);

    CREATE TABLE departments
    (
        id INT
        AUTO_INCREMENT NOT NULL,
departmentName VARCHAR
        (30)NULL,
 PRIMARY KEY
        (id)
);

        CREATE TABLE roles
        (
            id INT
            AUTO_INCREMENT NOT NULL,
titles VARCHAR
            (30)NULL,
salarys INT NOT NULL,
depIds INT NOT NULL, 
PRIMARY KEY
            (id)
);
