#!/usr/bin/env node

require('dotenv').config();

const faker = require('faker');
const debug = require('debug')('t-issue:db-dummy');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function createProjectData() {
  const projectCount = 5;

  return db.tx(async t => {
    let results = [];

    for (let i = 0; i < projectCount; i++) {
      const query = await t.one('INSERT INTO PROJECT(name, description) VALUES($1, $2) RETURNING *', [ faker.lorem.words(), faker.lorem.paragraph() ]);

      results.push(query);
    }

    return results;
  }).then( data => {
    data.forEach(result => debug(`inserted "${result.name}" in project table`))
    debug('\n\n');
  })
    .catch(err => debug(err))
}

function createUserData() {
  let selectQuery = 'SELECT role_id FROM role WHERE name = $1';
  let insertQuery = 'INSERT INTO "user"(first_name, last_name, email, password, role_id) VALUES($1, $2, $3, $4, $5) RETURNING *';

  return db.tx(async t => {
    let contributor = await t.any(selectQuery, ['contributor']);
    let developer = await t.any(selectQuery, ['developer']);
    let projectManager = await t.any(selectQuery, ['project manager']);
    let admin = await t.any(selectQuery, ['admin']);

    let roles = [ contributor, developer, projectManager, admin ];
    let results = [];

    try {
      password = await bcrypt.hash('fakeuser', saltRounds);
    } catch (err) {
      next(err);
    }

    // make it so we have 3 of each roles
    for (let role of roles) {
      for (let i = 0; i < 3; i++) {
        let queryResult = await t.one(insertQuery, [
          faker.name.firstName(),
          faker.name.lastName(),
          faker.internet.email(),
          password,
          role[0].role_id
        ]);

        results.push(queryResult);
      }
    }

    return results;
  }).then(data => {
    data.forEach(result => debug('inserted %O into user table', result));
    debug('\n\n');
  })
    .catch(err => debug(err))
}

function createProjectsUsersData() {
  return db.tx(async t => {
    let projects = await t.any('SELECT project_id FROM project');
    let users = await t.any('SELECT user_id FROM "user" u INNER JOIN role r ON u.role_id = r.role_id WHERE r.name != \'admin\'');

    let results = [];

    for (let project of projects) {

      // random number of users to assign to a project
      let userCount = Math.floor(Math.random() * (users.length));

      // array that will track which users have already been assigned to current project
      let pickedUsers = [];

      for (let i = 0; i <= userCount; i++) {
        let randomUserIndex = Math.floor(Math.random() * (users.length));

        if (pickedUsers.includes(users[randomUserIndex].user_id)) {
          continue;
        }

        let query = await t.one(
          'INSERT INTO projects_users(project_id, user_id) VALUES($1, $2) RETURNING *',
          [project.project_id, users[randomUserIndex].user_id]);

        pickedUsers.push(users[randomUserIndex].user_id);
        results.push(query);
      }
    }
    return results;
  })
    .then(data => {
      data.forEach(result => debug('inserted %O into project_users table', result));
      debug('\n\n');
    })
    .catch(err => debug(err));
}

function createIssueData() {
  return db.tx(async t => {
    let tags = await t.any('SELECT tag_id FROM "tag"');
    let priorities = await t.any('SELECT priority_id FROM "priority"');
    let projects = await t.any('SELECT project_id FROM "project"');
    let statuses = await t.any('SELECT status_id FROM "status"');

    let issuesNumber = 5;

    let results = [];

    for (let project of projects) {
      // Select users if they are part of the project or if they are admin
      let users = await t.any('SELECT user_id FROM projects_users WHERE project_id = $1 UNION SELECT user_id FROM "user" u INNER JOIN role r ON u.role_id = r.role_id WHERE r.name = \'admin\'', [project.project_id]);

      for (let i = 0; i < issuesNumber; i++) {
        let randomAssigneeIndex = Math.floor(Math.random() * users.length);
        let randomCreatorIndex = Math.floor(Math.random() * users.length);
        let randomTagsIndex = Math.floor(Math.random() * tags.length);
        let randomPrioritiesIndex = Math.floor(Math.random() * priorities.length);
        let randomStatusesIndex = Math.floor(Math.random() * statuses.length);

        let query = await t.one(
          'INSERT INTO issue(title, description, image, tag_id, assignee_id, creator_id, priority_id, project_id, status_id, created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [
            faker.lorem.words(),
            faker.lorem.paragraph(),
            faker.system.fileName(),
            tags[randomTagsIndex].tag_id,
            users[randomAssigneeIndex].user_id,
            users[randomCreatorIndex].user_id,
            priorities[randomPrioritiesIndex].priority_id,
            project.project_id,
            statuses[randomStatusesIndex].status_id,
            faker.date.between('2020-01-01', '2020-05-20')
          ]);

        results.push(query);
      }
    }
    return results;
  })
    .then(data => {
      data.forEach(result => debug('inserted %O into issue table\n\n', result));
      debug('\n\n\n');
    })
    .catch(err => debug(err));
}

function createCommentData() {
  return db.tx(async t => {
    let issues = await t.any('SELECT issue_id, project_id FROM "issue"');
    let commentCount = 3;
    let results = [];

    for (let issue of issues) {
      // Get users that are part of the project the issue is a part of, or that are admin
      let users = await t.any('SELECT user_id FROM projects_users WHERE project_id = $1 UNION SELECT user_id FROM "user" u INNER JOIN role r ON u.role_id = r.role_id WHERE r.name = \'admin\'', [ issue.project_id ]);

      for (let i = 0; i < commentCount; i++) {
        let ramdomUsersIndex = Math.floor(Math.random() * users.length);

        let query = await t.one(
          'INSERT INTO comment(text, author_id, issue_id, posted) VALUES($1, $2, $3, $4) RETURNING *',
          [
            faker.lorem.sentences(),
            users[ramdomUsersIndex].user_id,
            issue.issue_id,
            faker.date.between('2020-02-01', '2020-05-20')
          ]
        );

        results.push(query);
      }
    }

    return results;
  })
    .then(data => {
      data.forEach(result => debug('inserted %O into comment table\n\n', result));
      debug('\n\n\n');
    })
    .catch(err => debug(err));
}

createUserData()
  .then(createProjectData)
  .then(createProjectsUsersData)
  .then(createIssueData)
  .then(createCommentData)
  .catch(err => debug(err))
  .finally(db.$pool.end);
