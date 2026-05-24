/**
 * @fynqo/wgs-vroegsignaal-schema
 * Exports the Inwonersignaal JSON Schema and helpers to build an AJV validator.
 *
 * Usage:
 *   const Ajv = require('ajv');
 *   const addFormats = require('ajv-formats');
 *   const { schema, buildValidator } = require('@fynqo/wgs-vroegsignaal-schema');
 *
 *   const validate = buildValidator(Ajv, addFormats);
 *   if (!validate(record)) console.error(validate.errors);
 */

const schema = require('./schemas/inwonersignaal.schema.json');

/**
 * Build an AJV validator for the inwonersignaal schema.
 * Caller supplies Ajv + addFormats so we don't bundle a specific Ajv version.
 *
 * @param {function} Ajv - AJV constructor (ajv v8+).
 * @param {function} [addFormats] - optional ajv-formats plugin.
 * @returns {(data: unknown) => boolean} validator function (with `.errors`).
 */
function buildValidator(Ajv, addFormats) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  if (typeof addFormats === 'function') addFormats(ajv);
  return ajv.compile(schema);
}

module.exports = { schema, buildValidator };
