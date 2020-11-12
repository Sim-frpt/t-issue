const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:issueModel');

exports.create = async issue => {
  const query = {
    text: 'INSERT INTO issue(title, description, image, tag_id, assignee_id, creator_id, priority_id, project_id, status_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING issue_id',
    values: Object.values(issue)
  };

  try {
    const result = db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
  };

exports.findAll = async (params) => {
  // Adding wildcard characters to the title query param
  params.title ? `%${params.title}%` : undefined;

  const query = 'SELECT i.issue_id, i.title, i.description, i.image, t.name, u.first_name || \' \' || u.last_name as assignee, c.first_name || \' \' || c.last_name as creator, prio.name as priority, proj.name as project, s.name as status, created FROM issue i INNER JOIN tag t ON i.tag_id = t.tag_id LEFT JOIN "user" u ON i.assignee_id = u.user_id INNER JOIN "user" c ON i.creator_id = c.user_id INNER JOIN priority prio ON i.priority_id = prio.priority_id INNER JOIN project proj ON i.project_id = proj.project_id INNER JOIN status s ON i.status_id = s.status_id WHERE (${project_id} IS NULL OR i.project_id = ${project_id}) AND (${title} IS NULL OR i.title LIKE ${title}) AND (${tag_id} IS NULL OR i.tag_id = ${tag_id}) AND (${assignee_id} IS NULL OR i.assignee_id = ${assignee_id}) AND (${creator_id} IS NULL OR i.creator_id = ${creator_id}) AND (${priority_id} IS NULL OR i.priority_id = ${priority_id}) AND (${status_id} IS NULL OR i.status_id = ${status_id});';

  try {
    const results = db.any(query, params);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};

exports.findById = async id => {
  const query = {
    text: 'SELECT i.issue_id, i.title, i.description, i.image, t.name, u.first_name || \' \' || u.last_name as assignee, c.user_id as creator_id, c.first_name || \' \' || c.last_name as creator, prio.name as priority, proj.name as project, s.name as status, created FROM issue i INNER JOIN tag t ON i.tag_id = t.tag_id LEFT JOIN "user" u ON i.assignee_id = u.user_id INNER JOIN "user" c ON i.creator_id = c.user_id INNER JOIN priority prio ON i.priority_id = prio.priority_id INNER JOIN project proj ON i.project_id = proj.project_id INNER JOIN status s ON i.status_id = s.status_id WHERE i.issue_id = $1',
    values: [ id ]
  };

  try {
    const result = db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};

exports.delete = async id => {
  const query = {
    text: 'DELETE FROM issue WHERE issue.issue_id = $1 RETURNING issue.issue_id',
    values: [ id ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}
