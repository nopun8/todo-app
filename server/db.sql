drop database if exists todo;
create database todo;
use todo;

-- Create the task table
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

-- Insert initial data into the task table
INSERT INTO task (description) VALUES ('My test task');
INSERT INTO task (description) VALUES ('My another test task');