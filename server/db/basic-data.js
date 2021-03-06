#!/usr/bin/env node

require('dotenv').config();

const debug = require('debug')('t-issue:db-samples');
const db = require('../config/db');

function createStatusData() {
  db.tx(async t => {
    let a = await t.one('INSERT INTO status(name) VALUES($1) RETURNING name', ['open']);
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
    debug('\n');
  })
    .catch(err => debug(err))
}

function createTagData() {
  db.tx(async t => {
    let a = await t.one('INSERT INTO tag(name) VALUES($1) RETURNING name', ['bug']);
    let b = await t.one('INSERT INTO tag(name) VALUES($1) RETURNING name',
      ['feature request']);
    let c = await t.one('INSERT INTO tag(name) VALUES($1) RETURNING name',
      ['training/documentation request']);
    let d = await t.one('INSERT INTO tag(name) VALUES($1) RETURNING name',
      ['other']);

    return { a, b, c, d };
  }).then(data => {
    for (let result in data) {
      debug(`inserted "${data[result].name}" in tag table`);
    }
    debug('\n');
  })
    .catch(err => debug(err))
}

function createPriorityData() {
  db.tx(async t => {
    let a = await t.one('INSERT INTO priority(name) VALUES($1) RETURNING name',
      ['low']);
    let b = await t.one('INSERT INTO priority(name) VALUES($1) RETURNING name',
      ['normal']);
    let c = await t.one('INSERT INTO priority(name) VALUES($1) RETURNING name',
      ['hot']);

    return { a, b, c };
  }).then(data => {
    for (let result in data) {
      debug(`inserted "${data[result].name}" in priority table`);
    }
    debug('\n');
  })
    .catch(err => debug(err))
}

function createRoleData() {
  db.tx(async t => {
    let a = await t.one('INSERT INTO role(name) VALUES($1) RETURNING name',
      ['contributor']);
    let b = await t.one('INSERT INTO role(name) VALUES($1) RETURNING name',
      ['developer']);
    let c = await t.one('INSERT INTO role(name) VALUES($1) RETURNING name',
      ['project manager']);
    let d = await t.one('INSERT INTO role(name) VALUES($1) RETURNING name',
      ['admin']);

    return { a, b, c, d };
  }).then(data => {
    for (let result in data) {
      debug(`inserted "${data[result].name}" in role table`);
    }
    debug('\n');
  })
    .catch(err => debug(err))
    .finally(db.$pool.end);
}

createStatusData();
createTagData();
createPriorityData();
createRoleData();
