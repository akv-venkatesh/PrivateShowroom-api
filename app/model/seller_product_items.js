const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_product_items', {
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
    seller_product_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_items table ref id",
      references: {
        model: 'm_product_items',
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
    tableName: 'seller_product_items',
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
        name: "seller_product_item_id",
        using: "BTREE",
        fields: [
          { name: "seller_product_item_id" },
        ]
      },
    ]
  });
};
