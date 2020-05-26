#!/usr/bin/env node

require('dotenv').config();

const faker = require('faker');
const debug = require('debug')('t-issue:db-dummy');
const db = require('./db');

function createProjectData() {
  const names = [];

  for (let i = 0; i < 5; i++) {
    names[i] = faker.lorem.words();
  }

  return db.tx(async t => {
    let results = [];

    for (let name of names) {
      const query = await t.one('INSERT INTO PROJECT(name) VALUES($1) RETURNING name', name);

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
  let selectQuery = 'SELECT role_id from role WHERE name = $1';
  let insertQuery = 'INSERT INTO "user"(first_name, last_name, email, password, role_id) VALUES($1, $2, $3, $4, $5) RETURNING *';

  return db.tx(async t => {
    let contributor = await t.any(selectQuery, ['contributor']);
    let developer = await t.any(selectQuery, ['developer']);
    let projectManager = await t.any(selectQuery, ['project manager']);
    let admin = await t.any(selectQuery, ['admin']);

    let roles = [ contributor, developer, projectManager, admin ];

    let results = [];

    for (let role of roles) {
      let queryResult =  await t.one(insertQuery, [
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.internet.password(),
        role[0].role_id
      ]);

      results.push(queryResult);
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
    let projects = await t.any('SELECT project_id from project');
    let users = await t.any('SELECT user_id FROM "user"');

    let results = [];
    for (let project of projects) {
      // random number of users to assign to a project
      let usersNumber = Math.floor(Math.random() * (users.length - 1) + 1);

      for (let i = 0; i < usersNumber; i++) {
        let query = await t.one(
          'INSERT INTO projects_users(project_id, user_id) VALUES($1, $2) RETURNING *',
          [project.project_id, users[i].user_id]);

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
    let users = await t.any('SELECT user_id from "user"');
    let tags = await t.any('SELECT tag_id from "tag"');
    let priorities = await t.any('SELECT priority_id from "priority"');
    let projects = await t.any('SELECT project_id from "project"');
    let statuses = await t.any('SELECT status_id from "status"');

    let results = [];

    for (let i = 0; i < 16; i++) {
      let randomUsersIndex = Math.floor(Math.random() * users.length);
      let randomTagsIndex = Math.floor(Math.random() * tags.length);
      let randomPrioritiesIndex = Math.floor(Math.random() * priorities.length);
      let randomProjectsIndex = Math.floor(Math.random() * projects.length);
      let randomStatusesIndex = Math.floor(Math.random() * statuses.length);

      let query = await t.one(
        'INSERT INTO issue(title, description, image, tag_id, assignee_id, creator_id, priority_id, project_id, status_id, created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [
          faker.lorem.words(),
          faker.lorem.paragraph(),
          faker.system.fileName(),
          tags[randomTagsIndex].tag_id,
          users[randomUsersIndex].user_id,
          users[randomUsersIndex].user_id,
          priorities[randomPrioritiesIndex].priority_id,
          projects[randomProjectsIndex].project_id,
          statuses[randomStatusesIndex].status_id,
          faker.date.between('2020-01-01', '2020-05-20')
        ]);

      results.push(query);
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
    let users = await t.any('SELECT user_id from "user"');
    let issues = await t.any('SELECT issue_id from "issue"');

    let results = [];

    for (let i = 0; i < 10; i++) {
      let ramdomUsersIndex = Math.floor(Math.random() * users.length);
      let randomIssuesIndex = Math.floor(Math.random() * issues.length);

      let query = await t.one(
        'INSERT INTO comment(text, author_id, issue_id, posted) VALUES($1, $2, $3, $4) RETURNING *',
        [
          faker.lorem.sentences(),
          users[ramdomUsersIndex].user_id,
          issues[randomIssuesIndex].issue_id,
          faker.date.between('2020-02-01', '2020-05-20')
        ]
      );

      results.push(query);
    }

    return results;
  })
    .then(data => {
      data.forEach(result => debug('inserted %O into comment table\n\n', result));
      debug('\n\n\n');
    })
    .catch(err => debug(err));
}

createProjectData()
  .then(createUserData)
  .then(createProjectsUsersData)
  .then(createIssueData)
  .then(createCommentData)
  .catch(err => debug(err))
  .finally(db.$pool.end);
