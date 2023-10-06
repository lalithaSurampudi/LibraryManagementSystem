/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const path = require("path");
APP_ROOT = `${path.resolve(`${__dirname}/../../`)}`;
exports.APP_ROOT = APP_ROOT;
exports.CONF_DIR = `${APP_ROOT}/conf`;
// LIB_PATH: Location to APIs lib directory
exports.LIB_PATH = path.resolve(__dirname + "/../lib");
// Simple API Response for success or failure
exports.API_RESPONSE_TRUE = { result: true };
exports.API_RESPONSE_FALSE = { result: false };
 
// db connection
exports.API_INSUFFICIENT_PARAMS = 'insufficient params';

//sql driver path
exports.DRIVER_PATH = path.resolve(
  __dirname + '/../lib/' + 'db.js'
);

exports.DB_DIR = `${APP_ROOT}/db`;
exports.SCHEMAS_PATH = path.resolve(
  __dirname + '/../db/' + 'schema.json'
);

exports.DB_PATH = 'C:/Users/HP/OneDrive/Desktop/My_Project/monkshu/backend/apps/sample/db/database.db';
exports.DB_FOLDER_PATH = 'C:/Users/HP/OneDrive/Desktop/My_Project/monkshu/backend/apps/sample/db';
