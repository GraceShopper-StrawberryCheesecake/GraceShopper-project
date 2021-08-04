const { models: { Customer } } = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const customer = await Customer.findByToken(token)
    req.customer = customer
    next()
  } catch(e) {
    next(e)
  }
}

const isAdmin = (req, res, next) => {
  if (!req.customer.isAdmin) {
    return res.status(403).send('You don\'t belong here. Mind your business!')
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
