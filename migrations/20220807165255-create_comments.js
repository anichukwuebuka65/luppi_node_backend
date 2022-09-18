'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'posts'
          },
          key: 'id'
        },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('comments');
  
  }
};
