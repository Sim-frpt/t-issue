DROP TABLE IF EXISTS "status" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE ;
DROP TABLE IF EXISTS "priority" CASCADE;
DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "project" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "projects_users" CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE;
DROP TABLE IF EXISTS "issue";

CREATE TABLE "status" (
  status_id serial PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE "tag" (
  tag_id serial PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE "priority" (
  priority_id serial PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE "role" (
  role_id serial PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL
);

CREATE TABLE "user" (
  user_id serial PRIMARY KEY,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100),
  role_id INTEGER REFERENCES "role" (role_id) NOT NULL
);

CREATE TABLE "project" (
  project_id serial PRIMARY KEY,
  name varchar(100) UNIQUE NOT NULL,
  description varchar(2000)
);

CREATE TABLE "projects_users" (
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, project_id),
  FOREIGN KEY (user_id) REFERENCES "user" (user_id),
  FOREIGN KEY (project_id) REFERENCES "project" (project_id)
);

CREATE TABLE "issue" (
  issue_id serial PRIMARY KEY,
  title varchar(200) NOT NULL,
  description varchar (2000),
  image varchar(200),
  tag_id INTEGER references "tag" (tag_id),
  assignee_id INTEGER references "user" (user_id),
  creator_id INTEGER references "user" (user_id),
  priority_id INTEGER references "priority" (priority_id),
  project_id INTEGER references "project" (project_id),
  status_id INTEGER references "status" (status_id),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "comment" (
  comment_id serial PRIMARY KEY,
  text varchar(1000) NOT NULL,
  author_id INTEGER references "user" (user_id) NOT NULL,
  issue_id INTEGER references "issue" (issue_id) NOT NULL,
  posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
