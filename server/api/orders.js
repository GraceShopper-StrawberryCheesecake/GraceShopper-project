const router = require('express').Router()
const { models: { Customer, Order, Item, OrderItem }} = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
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
            
            let stock = item.quantity - items[itemId]
            item.update({quantity: stock})
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

router.get('/updateorder/:id', requireToken, async (req, res, next) => {
  try {
      // const order = await Order.findByPk(req.params.id, )
      const order = await Order.findOne({
        where: {
          id: req.params.id
        }, include: {model: Item}
      })

      
      for(let i = 0; i < order.items.length; i++) {
        let stock = order.items[i].quantity - order.items[i].orderItem.quantity
        await order.items[i].update({quantity: stock})
      }
      
      await order.update({orderComplete: true})
      const newOrder = await Order.create()
      await req.customer.addOrder(newOrder)
      
      res.json(newOrder)
  } catch (error) {
    next(error)
  }
})