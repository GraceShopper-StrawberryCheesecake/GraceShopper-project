const router = require('express').Router()
const { models: {Customer }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await Customer.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body)
    res.send({token: await customer.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Customer already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await Customer.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
