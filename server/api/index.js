const router = require('express').Router()
module.exports = router

//I think this line has to be changed to customers
router.use('/users', require('./users'))
router.use('/items', require('./items'))

router.use('/items', require('./items'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
