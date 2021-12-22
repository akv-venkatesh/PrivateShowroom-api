const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    img_path: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "0->No, 1->Yes"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "-1 ->Deleted, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'product_images',
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
    ]
  });
};
