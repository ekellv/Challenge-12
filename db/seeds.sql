use employees_db; 

INSERT INTO department (name)
VALUES
    ('HR'),
    ('Finance & Accounting'),
    ('IT'),
    ('Sales & Marketing'); 

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('HR Lead', 100000, 1),
    ('HR Partner', 75000, 1),
    ('Accounting Lead', 125000, 2),
    ('Financial Analyst', 65000, 2),
    ('Senior Full Stack Developer', 120000, 3),
    ('Full Stack Developer', 70000, 3),
    ('Marketing Director', 140000, 4), 
    ('Sales Lead', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Ron', 'Swanson', 1, NULL),
    ('Leslie', 'Knope', 2, 1),
    ('Michael', 'Bluth', 3, NULL),
    ('Gob', 'Bluth', 4, 3),
    ('Jen', 'Barber', 5, NULL),
    ('Maurice', 'Moss', 6, 5),
    ('Michael', 'Scott', 7, NULL),
    ('Jim', 'Halpert', 8, 7);