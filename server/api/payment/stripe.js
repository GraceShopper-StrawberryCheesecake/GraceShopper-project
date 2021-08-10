const router = require('express').Router()
const stripe = require("stripe")("sk_test_51JME3SBWRmUa76tVEs2Rf0VcVAAlbzZVwUD5KHpbbfBjsewt50bkPu8c87k77YfKB4WqLrTKsAUtvjr6YD7UlVbO00RBgjjL7u");
module.exports = router


router.post("/create-payment-intent", async (req, res) => {
    try {
        const { total } = req.body;
        console.log('total in post req', total)
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd"
        });
        console.log('paymentIntent', paymentIntent)
        res.send({
          clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.log(error)
    }
  });