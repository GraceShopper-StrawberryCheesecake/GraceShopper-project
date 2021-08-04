const { db, models: { Customer, Item, } }= require('../server/db');
const Order = require('../server/db/models/Order');

const seed = async () => {

  try {
    await db.sync({ force: true });

    const emails = ['Duane@gmail.com','Francis@gmail.com','Fabiola@gmail.com','Lenna@gmail.com','Viviana@gmail.com','Val@gmail.com','Latosha@gmail.com','Nancie@gmail.com','Reina@gmail.com','Torie@gmail.com','Rosemary@gmail.com','Fredrick@gmail.com','Nola@gmail.com','Trudie@gmail.com','Carri@gmail.com','Freeda@gmail.com','Jannette@gmail.com','Catalina@gmail.com','Miyoko@gmail.com','Yuki@gmail.com','Chelsea@gmail.com','Petra@gmail.com','Yasmine@gmail.com','Lashawn@gmail.com','Kina@gmail.com','Enola@gmail.com','Randi@gmail.com','Nina@gmail.com','Rochelle@gmail.com','Siu@gmail.com','Norma@gmail.com','Apolonia@gmail.com','Hermine@gmail.com','Leonie@gmail.com','Jessia@gmail.com','Joya@gmail.com','Kelle@gmail.com','Fredda@gmail.com','Synthia@gmail.com','Rachel@gmail.com','Jospeh@gmail.com','Oren@gmail.com','Douglas@gmail.com','Mignon@gmail.com','Beverley@gmail.com','Melissia@gmail.com','Gwenda@gmail.com','Demarcus@gmail.com','Garrett@gmail.com','Lasonya@gmail.com']

    const customers = [];
    for (let i = 0; i < emails.length; i++) {
      customers.push(await Customer.create({name: emails[i].substring(0,emails[i].indexOf('@')), email: emails[i], password: 'password'}))
    }

    const food = ['Raspberry', 'Blackberry', 'Avacado', 'Tomato', 'Skittles', 'Chips', 'Green Pepper']

    const items = [];
    for (let i = 0; i < food.length; i++) {
      items.push(await Item.create({name: food[i]}))
    }

    const Item1 = await Item.create({name: 'Strawberry', description: 'A red fruit that we all can enjoy', imgUrl: 'https://billsberryfarm.com/wp-content/uploads/2020/08/strawberry-2.png', quantity: 10, price: 12.00})
    const Item2 = await Item.create({name: 'Blueberry', description: 'An amazing, very good, blue fruit, that I also had as a smoothie this morning', imgUlr: 'https://www.freshpoint.com/wp-content/uploads/commodity-blueberry.jpg', quantity: 2, price: 5.99})
    const Item3 = await Item.create({name: 'Lemon', description: 'Something you find on your drinks in resturaunts, if you can remember going places.', imgUrl: 'https://assets.bonappetit.com/photos/5fd134d5e4009dfec306c19f/8:5/w_2840,h_1775,c_limit/Basically-Lemon.jpg', quantity: 10000, price: 1.86})

    const Order1 = await Order.create()
    const Order2 = await Order.create()

    customers[0].addOrder(Order1)
    customers[1].addOrder(Order2)

    await Order1.addItems([Item1, Item2, Item3]);
 

    return [...customers, ...items]

  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
