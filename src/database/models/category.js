const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
    tableName: 'Categories',
  }
  );
  return Category;
};

module.exports = Category;