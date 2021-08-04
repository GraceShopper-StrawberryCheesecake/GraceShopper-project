const router = require('express').Router()
const { models: { User, Order, Item }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({ 
      where: { 
        customerId: req.params.userId,
        orderComplete: false
      }, include: {model: Item}
    })
    console.log("order in get route -->", order)
    res.send(order)
  } catch (err) {
    next(err)
  }
}) 
