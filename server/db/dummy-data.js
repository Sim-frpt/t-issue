#!/usr/bin/env node

require('dotenv').config();

const faker = require('faker');
const debug = require('debug')('t-issue:db-dummy');
const db = require('./db');

function createStatusData() {
  db.tx(async t => {
    let a = await t.one('INSERT INTO status(name) VALUES($1) RETURNING name', ['new']);
    let b = await t.one('INSERT INTO status(name) VALUES($1) RETURNING name',
      ['in progress']);
    let c = await t.one('INSERT INTO status(name) VALUES($1) RETURNING name',
      ['resolved']);
    let d = await t.one('INSERT INTO status(name) VALUES($1) RETURNING name',
      ['closed']);

    return { a, b, c, d };
  }).then(data => {
    for (let result in data) {
      debug(`inserted "${data[result].name}" in status table`);
    }
  })
    .catch(err => debug(err))
}

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
    console.log('\n');
  })
    .catch(err => debug(err))
}

function createUserData() {
  let selectQuery = 'SELECT role_id from role WHERE name = $1';
  let insertQuery = 'INSERT INTO "user"(first_name, last_name, email, password, role_id) VALUES($1, $2, $3, $4, $5) RETURNING *';

  return db.tx(async t => {
    let customer = await t.any(selectQuery, ['customer']);
    let developer = await t.any(selectQuery, ['developer']);
    let projectManager = await t.any(selectQuery, ['project manager']);
    let admin = await t.any(selectQuery, ['admin']);

    let roles = [ customer, developer, projectManager, admin ];

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
    console.log('\n');
  })
    .catch(err => debug(err))
}

function createProjectsUsersData() {
  return db.tx(async t => {
    let projects = await t.any('SELECT project_id from project');
    let users = await t.any('select user_id from "user"');

    let results = [];
    for (let project of projects) {
      let usersNumber = Math.floor(Math.random() * (users.length - 1) + 1);

      for (let i = 0; i < usersNumber; i++) {
        let query = await t.one(
          'INSERT INTO projects_users(project_id, user_id) VALUES ($1, $2) RETURNING *',
          [project.project_id, users[i].user_id]);

        results.push(query);
      }
    }
    return results;
  })
    .then(data => {
      data.forEach(result => debug('inserted %O into project_users table', result));
      console.log('\n');
    })
    .catch(err => debug(err));
}

createProjectData()
  .then(createUserData)
  .then(createProjectsUsersData)
  .catch(err => debug(err));
