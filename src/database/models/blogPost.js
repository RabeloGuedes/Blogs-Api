const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updated: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: false,
  });

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
};

  return BlogPost;
};


module.exports = BlogPost;