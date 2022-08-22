'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shares', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      shares: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'posts'
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
   await queryInterface.dropTable('shares');
  
  }
};
