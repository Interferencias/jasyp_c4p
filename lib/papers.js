const _ = require('lodash');
const db = require('sqlite');
const debug = require('debug')('jasyp-c4p:lib:papers');

function getAll() {
  return db.all('SELECT * FROM Papers');
}

function create(paper) {
  return new Promise((resolve, reject) => {
    validate(paper)
      .then(module.exports.save)
      .then(statement => resolve(statement.stmt.lastID))
      .catch(error => reject(error));
  });
}

function save(paper) {
  const sql = 'INSERT INTO Papers (title, name, email, abstract) ' +
    'VALUES (?, ?, ?, ?) ';
  const values = [
    paper.title,
    paper.name,
    paper.email,
    paper.abstract,
  ];

  debug(`Saving ${values}`);

  return db.run(sql, values);
}

function validate(paper) {
  debug(`Validating ${JSON.stringify(paper)}`);

  return new Promise((resolve, reject) => {
    paper.validator((error, value) => {
      if (_.isNull(error)) {
        return resolve(value);
      }
      return reject(error);
    });
  });
}

module.exports = {
  create,
  getAll,
  save,
  validate
}
