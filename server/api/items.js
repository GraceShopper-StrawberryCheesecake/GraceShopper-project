const router = require('express').Router()
const { models: { Item }} = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    await item.update(req.body)
    res.json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleItem = await Item.findOne( { where: {
      id: req.params.id
    }
  })
  res.json(singleItem)
  } catch(e) {
    next(e)
  }
})
