const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "buyers table ref id",
      references: {
        model: 'buyers',
        key: 'id'
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "sellers table ref id",
      references: {
        model: 'sellers',
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
      comment: "product_colors table ref id",
      references: {
        model: 'product_colors',
        key: 'id'
      }
    },
    product_size_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "product_sizes table ref id",
      references: {
        model: 'product_sizes',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cart_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "1->Cart, 2->Wishlist"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "-1->dleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'cart',
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
        name: "buyer_id",
        using: "BTREE",
        fields: [
          { name: "buyer_id" },
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
