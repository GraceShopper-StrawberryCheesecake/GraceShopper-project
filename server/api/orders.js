const router = require('express').Router()
const { models: { Customer, Order, Item }} = require('../db')
module.exports = router


router.put('/:id', async (req, res, next) => {
    try {
        let order = await Order.findByPk(req.params.id)
        if(order) {
          await order.removeItems(await order.getItems())
  
          const items = req.body
          
          for (let itemId in items) {
            let item = await Item.findByPk(itemId)
            order.addItem(item, {through: {price: item.price, quantity: items[itemId]}})
          }
          res.json(req.body)
        } else {
          
          order = await Order.create({orderComplete: true})
          const items = req.body
          
          for (let itemId in items) {
            let item = await Item.findByPk(itemId)
            order.addItem(item, {through: {price: item.price, quantity: items[itemId]}})
          }
          res.json(req.body)
        }
    } catch (error) {
      next(error)
    }
})

router.get('/:id', async (req, res, next) => {
  try {
    Order.update(
      {orderComplete: true},
      {where: {id: req.params.id}}
      )

    const order = await Order.create()

  } catch (error) {
    next(error)
  }
})