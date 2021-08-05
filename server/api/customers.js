const router = require('express').Router()
const { models: { Customer, Order, Item }} = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      attributes: ['id', 'name', 'email']
    })
    res.json(customers)
  } catch (err) {
    next(err)
  }
})


router.put('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
})

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
})

router.get('/:customerId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const customer = await Customer.findOne({where: {id: req.params.customerId}},{
      attributes: ['id', 'name', 'email']
    })
    res.send(customer)
  } catch (error) {
    next(error)
  }
})

router.get('/:customerId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        customerId: req.params.customerId,
        orderComplete: false
      }, include: {model: Item}
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

