'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('image', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      imageUrl: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'posts'
          },
          key: "id",
        }
      }
    });  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('image');
  
  }
};
