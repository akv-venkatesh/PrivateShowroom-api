const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1->Admin, 2->Seller, 3->Buyer"
    },
    last_success_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reset_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "signup\/forgot password process activation key"
    },
    otp: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    otp_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otp_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "account created time"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "-2->Deleted, -1 -> Verification pending, 0->Inactive, 1->Active"
    }
  }, {
    sequelize,
    tableName: 'user',
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
