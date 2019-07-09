module.exports = function(sequelize, DataTypes) {
  // Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
  var bcrypt = require("bcryptjs");

  var userLogin = sequelize.define("userLogin", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 20]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 40]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  userLogin.associate = function(models){
    userLogin.hasMany(models.postTable, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  userLogin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  userLogin.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  //userLogin.hasMany(posts);
  //userLogin.hasMany();
  return userLogin;
};
