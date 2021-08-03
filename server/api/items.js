const router = require('express').Router()
const { models: { Item }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
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
