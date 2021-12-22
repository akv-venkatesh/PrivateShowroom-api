const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer_prereq', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "user table ref id"
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "buyer table ref id"
    },
    private_show_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "private_shows table ref id"
    },
    yrs_in_business: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Expected Sellers min business experience in yrs"
    },
    production_capacity_per_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Production capacity per day"
    },
    aql: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Minimum Acceptable Quality Level"
    },
    lead_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Lead Time expected"
    },
    difot: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: " DIFOT Standard - Delivery in full on time "
    },
    min_order_per_colorway: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Minimum Order Per Design Colourway "
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "-1->Deleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'buyer_prereq',
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
    ]
  });
};
