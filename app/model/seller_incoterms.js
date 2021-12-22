const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_incoterms', {
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
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "seller table ref id",
      references: {
        model: 'sellers',
        key: 'id'
      }
    },
    incoterms_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_incoterms table ref id",
      references: {
        model: 'm_incoterms',
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
    tableName: 'seller_incoterms',
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
        name: "seller_id",
        using: "BTREE",
        fields: [
          { name: "seller_id" },
        ]
      },
      {
        name: "incoterms_id",
        using: "BTREE",
        fields: [
          { name: "incoterms_id" },
        ]
      },
    ]
  });
};
