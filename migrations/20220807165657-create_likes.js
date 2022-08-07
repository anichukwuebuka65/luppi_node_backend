'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // commentableId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false
      // },
      // commentableType: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
        
      // },
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
