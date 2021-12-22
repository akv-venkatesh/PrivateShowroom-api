const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('show_room_template_hotspots', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    show_room_template_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "show_room_templates table ref id",
      references: {
        model: 'show_room_templates',
        key: 'id'
      }
    },
    hotspot_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'show_room_template_hotspots',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "show_room_template_id",
        using: "BTREE",
        fields: [
          { name: "show_room_template_id" },
        ]
      },
    ]
  });
};
