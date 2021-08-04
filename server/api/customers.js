const router = require('express').Router()
const { models: { Customer }} = require('../db')
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
