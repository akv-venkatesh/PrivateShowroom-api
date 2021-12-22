const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_product_age_groups', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m_product_genders table ref"
    },
    from_age: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    to_age: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    display_order: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "admin table ref id"
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
    tableName: 'm_product_age_groups',
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
    ]
  });
};
