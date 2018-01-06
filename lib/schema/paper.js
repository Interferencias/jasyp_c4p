const Joi = require('joi');

module.exports = class Paper {
  constructor({ title, name, email, abstract }) {
    this.title = title;
    this.name = name;
    this.email = email;
    this.abstract = abstract;
  }

  validator(callback) {
    const schema = Joi.object().keys({
      title: Joi.string().max(255).required(),
      name: Joi.string().max(255).required(),
      email: Joi.string().max(255).required(),
      abstract: Joi.string().max(2000).allow(''),
    });

    Joi.validate(this, schema, {
      abortEarly: false,
      stripUnknown: true
    }, callback);
  }
}
