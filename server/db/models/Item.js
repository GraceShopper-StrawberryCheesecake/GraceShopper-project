const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: Sequelize.TEXT,

  quantity: {
    type: Sequelize.INTEGER,
    min: 0
  },
  price: {
      type: Sequelize.FLOAT,
      min: 0
  }
})

module.exports = Item



