module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    topic: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    isDone: { type: DataTypes.BOOLEAN },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Todo;
};
