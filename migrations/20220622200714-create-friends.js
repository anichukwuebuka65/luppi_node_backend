'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('friends', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
      },
      friendId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
    })
  }, 

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profile');
  }
  
};
