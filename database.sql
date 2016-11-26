CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name character varying(20),
    last_name character varying(40),
    idNumber INTEGER,
    title VARCHAR(50),
    salary INTEGER
);

INSERT INTO employees (first_name, last_name, idNumber, title, salary)
VALUES ('Michael', 'Brannan', 56, 'Emperor for life', 1000000),
('Luke', 'Schlangen', 42, 'Feedback Dictator', 100000);

SELECT *
FROM employees;
