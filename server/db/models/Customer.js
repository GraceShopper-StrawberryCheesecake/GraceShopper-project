const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Order = require('../models/Order')
const Item = require('../models/Item')

if(process.env.NODE_ENV !== 'production') {
  require('../../../secrets')
}

const SALT_ROUNDS = 5;

const Customer = db.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Customer

/**
 * instanceMethods
 */
Customer.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

Customer.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
Customer.authenticate = async function({ email, password }){
    const customer = await this.findOne({where: { email }})
    if (!customer || !(await customer.correctPassword(password))) {
      const error = Error('Incorrect email/password');
      error.status = 401;
      throw error;
    }
    return customer.generateToken();
};

Customer.findByToken = async function(token) {
  try {
    console.log("TOKEN IN Customer.js: ", token)
    const {id} = await jwt.verify(token, process.env.JWT)
    const customer = Customer.findByPk(id, {
      include: {
        model: Order,
        where: {
          orderComplete: false
        },
        include: Item
      } })
    if (!customer) {
      throw 'nooo'
    }
    return customer
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(customer) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (customer.changed('password')) {
    customer.password = await bcrypt.hash(customer.password, SALT_ROUNDS);
  }
}
const createCart = async(customer) => {
  const cart = await Order.create()
  await customer.addOrder(cart)
}

Customer.beforeCreate(hashPassword)
Customer.afterCreate(createCart)
Customer.beforeUpdate(hashPassword)
Customer.beforeBulkCreate(customers => Promise.all(customers.map(hashPassword)))
