const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer_prereq_certifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_prereq_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "buyer_prereq table ref id",
      references: {
        model: 'buyer_prereq',
        key: 'id'
      }
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
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "buyer table ref id",
      references: {
        model: 'buyers',
        key: 'id'
      }
    },
    certificate_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_certifications table ref id",
      references: {
        model: 'm_certifications',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "-1->Deleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'buyer_prereq_certifications',
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
        name: "buyer_id",
        using: "BTREE",
        fields: [
          { name: "buyer_id" },
        ]
      },
      {
        name: "certificate_id",
        using: "BTREE",
        fields: [
          { name: "certificate_id" },
        ]
      },
      {
        name: "buyer_prereq_id",
        using: "BTREE",
        fields: [
          { name: "buyer_prereq_id" },
        ]
      },
    ]
  });
};
