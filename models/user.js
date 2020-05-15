module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.Todo, { foreignKey: "user_id" });
  };

  return user;
};
