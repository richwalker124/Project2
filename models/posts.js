module.exports = function(sequelize, DataTypes) {
  var postTable = sequelize.define("postTable", {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 1000]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    }
    // likes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: "0"
    // },
    // dislikes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: "0"
    // },
    // deletedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // }
  });

  postTable.asociate = function(models) {
    postTable.belongsTo(models.userLogin, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return postTable;
};
