//this is the access point for all things database related!

const db = require('./db')

const Customer = require('./models/Customer')
const Item = require('./models/Item')
const Order = require('./models/Order')
//associations could go here!

Customer.hasMany(Order)
Order.belongsTo(Customer)
Item.belongsToMany(Order, {through: 'orderItems'})
Order.belongsToMany(Item, {through: 'orderItems'})


module.exports = {
  db,
  models: {
    Customer,
    Item,
    Order
  },
}
