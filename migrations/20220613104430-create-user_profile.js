'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      profilepicture: {
        type: Sequelize.STRING,
      },
      age: {
        type:  Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  }, 

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profiles');
  }
  
};
