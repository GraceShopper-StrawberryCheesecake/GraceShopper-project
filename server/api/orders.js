const router = require('express').Router()
const { models: { Customer, Order, Item }} = require('../db')
module.exports = router


router.put('/:id', async (req, res, next) => {

    try {
        const order = await Order.findByPk(req.params.id)
        await order.removeItems(await order.getItems())

        const items = req.body

        for (let itemId in items) {
            let item = await Item.findByPk(itemId)
            order.addItem(item, {through: {price: item.price, quantity: items[itemId]}})
        }
      res.json(req.body)
    } catch (error) {
      next(error)
    }


})