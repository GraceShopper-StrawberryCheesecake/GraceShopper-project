//this is the access point for all things database related!

const db = require('./db')

const Customer = require('./models/Customer')
const Item = require('./models/Item')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')
//associations could go here!

Customer.hasMany(Order)
Order.belongsTo(Customer)
Item.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Item, {through: OrderItem})


module.exports = {
  db,
  models: {
    Customer,
    Item,
    Order
  },
}
