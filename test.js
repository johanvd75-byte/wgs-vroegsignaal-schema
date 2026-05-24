// Lightweight smoke test — works without ajv installed by validating the
// schema is itself loadable and the fixtures parse as JSON.

const fs = require('fs');
const path = require('path');
const { schema } = require('./index');

function fail(msg) {
  console.error('FAIL:', msg);
  process.exit(1);
}

if (!schema || schema.title !== 'WGS Vroegsignaal — Inwonersignaal') {
  fail('schema title missing or wrong');
}

const fixturesDir = path.join(__dirname, 'fixtures');
for (const f of fs.readdirSync(fixturesDir)) {
  if (!f.endsWith('.json')) continue;
  try {
    const data = JSON.parse(fs.readFileSync(path.join(fixturesDir, f), 'utf8'));
    if (!data.signaalId) fail(`${f}: missing signaalId`);
  } catch (e) {
    fail(`${f}: ${e.message}`);
  }
}

try {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');
  const { buildValidator } = require('./index');
  const validate = buildValidator(Ajv, addFormats);
  for (const f of fs.readdirSync(fixturesDir)) {
    if (!f.endsWith('.json')) continue;
    const data = JSON.parse(fs.readFileSync(path.join(fixturesDir, f), 'utf8'));
    if (!validate(data)) fail(`${f}: ${JSON.stringify(validate.errors)}`);
  }
  console.log('ok (ajv validated fixtures)');
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('ok (schema + fixtures parsed; ajv not installed, skipped runtime validation)');
  } else {
    fail(e.message);
  }
}
