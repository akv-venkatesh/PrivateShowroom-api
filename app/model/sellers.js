const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sellers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "user table ref id",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    member_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "a unique member code for seller identification"
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    constitution_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_constitution table ref id",
      references: {
        model: 'm_constitution',
        key: 'id'
      }
    },
    contact_person: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(2500),
      allowNull: true
    },
    facebook_link: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    linkedin_link: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    business_started_year: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "for Years in Business field"
    },
    production_capacity_per_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Production capacity per day "
    },
    aql: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Minimum AQL followed"
    },
    lead_time: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Lead Time declaration"
    },
    difot: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "DIFOT Standard  - Delivery in full on time"
    },
    min_order_per_colorway: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Minimum Order Per Design Colourway"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'sellers',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "constitution",
        using: "BTREE",
        fields: [
          { name: "constitution_id" },
        ]
      },
    ]
  });
};
