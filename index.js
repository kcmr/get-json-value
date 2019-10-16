#!/usr/bin/env node

'use strict';

const fs = require('fs');
const chalk = require('chalk');
const { parse, join, extname } = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

const [keyPath, file] = process.argv.slice(2);
const searchdir = process.env.GJV_SEARCH_DIR;

// https://github.com/NonameMedia/undotify
const undotify = (path, obj) => {
  if (path) {
    path = path.split('.');
    path.forEach((key) => {
      obj = obj[key];
    });
  }

  return obj;
};

const logResult = (jsons) => (key) => {
  const result = undotify(keyPath, jsons[key]);
  const color = result ? 'green' : 'red';

  console.log(chalk[color](key), result);
};

async function getJsons(dir = '') {
  const jsonFiles = (file) => extname(file) === '.json';
  const files = await readdir(dir);

  return files.filter(jsonFiles).reduce((obj, file) => Object.assign(obj, {
    [parse(file).name]: require(join(process.cwd(), dir, file))
  }), {});
}

function logValue(jsons) {
  const log = logResult(jsons);
  const fileInJsons = file && jsons[file];

  return fileInJsons
    ? log(file)
    : Object.keys(jsons).map(log);
}

getJsons(searchdir)
  .then(logValue)
  .catch(console.error);
