"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require(path.join(__dirname, "..", "app", "config", "app.js"))[database];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config
);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
