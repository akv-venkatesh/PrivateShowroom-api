const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "orders table ref id",
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "products table ref id",
      references: {
        model: 'products',
        key: 'id'
      }
    },
    product_color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "product_colors table ref id ",
      references: {
        model: 'product_colors',
        key: 'id'
      }
    },
    product_size_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "product_sizes table ref id ",
      references: {
        model: 'product_sizes',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "-1 ->Deleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'order_details',
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
        name: "order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "product_color_id",
        using: "BTREE",
        fields: [
          { name: "product_color_id" },
        ]
      },
      {
        name: "product_size_id",
        using: "BTREE",
        fields: [
          { name: "product_size_id" },
        ]
      },
    ]
  });
};
