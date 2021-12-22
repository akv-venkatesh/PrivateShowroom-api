const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    private_show_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "private_shows table ref id (if product specific to any private shows only)",
      references: {
        model: 'private_shows',
        key: 'id'
      }
    },
    show_room_template_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "static value from show_room_templates table"
    },
    show_room_template_hotspot_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "static value from show_room_template_hotspots"
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
    product_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_groups table ref id",
      references: {
        model: 'm_product_groups',
        key: 'id'
      }
    },
    product_gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_genders table ref id",
      references: {
        model: 'm_product_genders',
        key: 'id'
      }
    },
    product_age_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_age_groups table ref id",
      references: {
        model: 'm_product_age_groups',
        key: 'id'
      }
    },
    product_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_items table ref id",
      references: {
        model: 'm_product_items',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    style_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    fob: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    moq: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    techpack_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "techpack pdf file path"
    },
    fabric: {
      type: DataTypes.STRING(2500),
      allowNull: true,
      comment: "JSON format string to store multiple values"
    },
    embellishment: {
      type: DataTypes.STRING(2500),
      allowNull: true,
      comment: "JSON format string to store multiple values"
    },
    packing: {
      type: DataTypes.STRING(2500),
      allowNull: true,
      comment: "JSON format string to store multiple values"
    },
    washcare: {
      type: DataTypes.STRING(2500),
      allowNull: true,
      comment: "JSON format string to store multiple values"
    },
    technical: {
      type: DataTypes.STRING(2500),
      allowNull: true,
      comment: "JSON format string to store multiple values"
    },
    main_display_img_path: {
      type: DataTypes.STRING(500),
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
    tableName: 'products',
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
        name: "product_category_id",
        using: "BTREE",
        fields: [
          { name: "product_category_id" },
        ]
      },
      {
        name: "product_group_id",
        using: "BTREE",
        fields: [
          { name: "product_group_id" },
        ]
      },
      {
        name: "private_show_id",
        using: "BTREE",
        fields: [
          { name: "private_show_id" },
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
        name: "product_gender_id",
        using: "BTREE",
        fields: [
          { name: "product_gender_id" },
        ]
      },
      {
        name: "product_age_group_id",
        using: "BTREE",
        fields: [
          { name: "product_age_group_id" },
        ]
      },
      {
        name: "product_item_id",
        using: "BTREE",
        fields: [
          { name: "product_item_id" },
        ]
      },
    ]
  });
};
