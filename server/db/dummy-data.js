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
    .catch(err => debug(err));
}

function createProjectData() {
  const names = [];

  for (let i = 0; i < 5; i++) {
    names[i] = faker.lorem.words();
  }

  db.tx(t => {
    results = [];
    names.forEach(async (name, i) => {
      results[i] = await t.one('INSERT INTO PROJECT(name) VALUES($1) RETURNING name', name);
    });

    return results;
  }).then( data =>  data.forEach(result => debug(`inserted "${result.name}" in project table`)))
    .catch(err => debug(err));
}

function createUserData() {
  const query = 'INSERT INTO user(first_name, last_name, email, password, role_id), VALUES($1, $2, $3, $4, $5) RETURNING user'

  //TODO
  //db.tx(async t => {
    //let a = await t.one(
  //}
}

createProjectData();
