const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {

    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

})

module.exports = OrderItem


OrderItem.afterCreate(item => {
    console.log(this)
})
