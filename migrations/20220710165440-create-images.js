'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('images', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commentableId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      commentableType: {
        type: Sequelize.STRING,
        allowNull: false,
        
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
   await queryInterface.dropTable('images');
  
  }
};
