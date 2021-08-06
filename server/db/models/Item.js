const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://pbs.twimg.com/profile_images/3100168478/20aea1ef732e8c5e68634dcb8236b4ef.jpeg'
  },

  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This item has no description!'
  },

  quantity: {
    type: Sequelize.INTEGER,
    min: 0,
    defaultValue: 0
  },

  price: {
      type: Sequelize.INTEGER,
      min: 0,
      defaultValue: 0
  }
})

module.exports = Item



