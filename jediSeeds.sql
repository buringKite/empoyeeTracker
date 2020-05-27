USE employeesDB;
INSERT INTO employees
    (firstName, lastName, roleId, managerId)
VALUES
    ('Asoka', 'Tano', 1, 2);

INSERT INTO departments
    (departmentName)
VALUES
    ('padawan'),
    ('jedi knight'),
    ('jedi master'),
    ( 'grand master');

INSERT INTO roles
    (titles, salarys, depIds)
VALUES
    ('padawan', 500 , 2);

SELECT *
FROM employees JOIN roles on employees.id = roles.id ;
