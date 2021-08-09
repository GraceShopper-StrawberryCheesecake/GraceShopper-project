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

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body)
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id)
    await customer.destroy()
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id)
    await customer.update(req.body)
    res.json(customer)
  } catch (error) {
    next(error)
  }
})


router.get('/:id', requireToken, async (req, res, next) => {
  try {
    if(req.customer.isAdmin) {
      const customer = await Customer.findOne({where: {id: req.params.id}},{
        attributes: ['id', 'name', 'email']
      })
      res.send(customer)
    } else {
      const customer = await Customer.findOne({where: {id: req.customer.id}},{
        attributes: ['id', 'name', 'email']
      })
      res.send(customer)
    }
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

