import sequelize from 'sequelize';
import connect from '../config/Postgreconnect.js';

const User = connect.define(
  'users', {
    userId: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
  }, { underscored: true },
);

export default User;
