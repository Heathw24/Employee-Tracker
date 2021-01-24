DROP DATABASE IF EXISTS company_DB;

CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE department (
    id AUTO_INCREMENT INT NOT NULL,
    depName VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id AUTO_INCREMENT INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10, 2) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id AUTO_INCREMENT INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL, 
    PRIMARY KEY (id)
)

