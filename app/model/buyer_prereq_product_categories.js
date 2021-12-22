const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer_prereq_product_categories', {
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
    product_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_categories table ref id",
      references: {
        model: 'm_product_categories',
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
      comment: "-1->Deleted, 0->Inactive, 1->Active \t"
    }
  }, {
    sequelize,
    tableName: 'buyer_prereq_product_categories',
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
        name: "product_category_id",
        using: "BTREE",
        fields: [
          { name: "product_category_id" },
        ]
      },
    ]
  });
};
