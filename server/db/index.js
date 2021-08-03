//this is the access point for all things database related!

const db = require('./db')

const Customer = require('./models/Customer')
const Item = require('./models/Item')

//associations could go here!

Customer.belongsToMany(Item, {through: 'cart'})
Item.belongsToMany(Customer, {through: 'cart'})

module.exports = {
  db,
  models: {
    Customer,
    Item,
  },
}
