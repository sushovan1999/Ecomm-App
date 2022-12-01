module.exports = (sequelize, dbConnection) => {
  const user = dbConnection.define(
    "users",
    {
      username: {
        type: sequelize.STRING,
      },
      email: {
        type: sequelize.STRING,
      },
      password: {
        type: sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};
