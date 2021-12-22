const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer_prereq_payment_terms', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_prereq_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "buyer_prereq table ref id",
      references: {
        model: 'buyer_prereq',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "user table ref id",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "buyer table ref id",
      references: {
        model: 'buyers',
        key: 'id'
      }
    },
    payment_terms_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "m_payment_terms table ref id",
      references: {
        model: 'm_payment_terms',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "-1->Deleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'buyer_prereq_payment_terms',
    timestamps: false,
    indexes: [
      {
        name: "buyer_prereq_id",
        using: "BTREE",
        fields: [
          { name: "buyer_prereq_id" },
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
        name: "payment_terms_id",
        using: "BTREE",
        fields: [
          { name: "payment_terms_id" },
        ]
      },
    ]
  });
};
