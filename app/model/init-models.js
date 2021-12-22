var DataTypes = require("sequelize").DataTypes;
var _buyer_prereq = require("./buyer_prereq");

function initModels(sequelize) {
  var buyer_prereq = _buyer_prereq(sequelize, DataTypes);


  return {
    buyer_prereq,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
