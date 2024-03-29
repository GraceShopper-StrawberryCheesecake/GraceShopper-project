const {
  db,
  models: { Customer, Item },
} = require('../server/db');
const Order = require('../server/db/models/Order');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const emails = [
      'Duane@gmail.com',
      'Francis@gmail.com',
      'Fabiola@gmail.com',
      'Lenna@gmail.com',
      'Viviana@gmail.com',
      'Val@gmail.com',
      'Latosha@gmail.com',
      'Nancie@gmail.com',
      'Reina@gmail.com',
      'Torie@gmail.com',
      'Rosemary@gmail.com',
      'Fredrick@gmail.com',
      'Nola@gmail.com',
      'Trudie@gmail.com',
      'Carri@gmail.com',
      'Freeda@gmail.com',
      'Jannette@gmail.com',
      'Catalina@gmail.com',
      'Miyoko@gmail.com',
      'Yuki@gmail.com',
      'Chelsea@gmail.com',
      'Petra@gmail.com',
      'Yasmine@gmail.com',
      'Lashawn@gmail.com',
      'Kina@gmail.com',
      'Enola@gmail.com',
      'Randi@gmail.com',
      'Nina@gmail.com',
      'Rochelle@gmail.com',
      'Siu@gmail.com',
      'Norma@gmail.com',
      'Apolonia@gmail.com',
      'Hermine@gmail.com',
      'Leonie@gmail.com',
      'Jessia@gmail.com',
      'Joya@gmail.com',
      'Kelle@gmail.com',
      'Fredda@gmail.com',
      'Synthia@gmail.com',
      'Rachel@gmail.com',
      'Jospeh@gmail.com',
      'Oren@gmail.com',
      'Douglas@gmail.com',
      'Mignon@gmail.com',
      'Beverley@gmail.com',
      'Melissia@gmail.com',
      'Gwenda@gmail.com',
      'Demarcus@gmail.com',
      'Garrett@gmail.com',
      'Lasonya@gmail.com',
    ];

    const customers = [];
    for (let i = 0; i < emails.length; i++) {
      customers.push(
        await Customer.create({
          name: emails[i].substring(0, emails[i].indexOf('@')),
          email: emails[i],
          password: 'password',
        })
      );
    }

    // const food = ['Raspberry', 'Blackberry', 'Avacado', 'Tomato', 'Skittles', 'Chips', 'Green Pepper']

    // const items = [];
    // for (let i = 0; i < food.length; i++) {
    //   items.push(await Item.create({name: food[i]}))
    // }

    const Item1 = await Item.create({
      name: 'Strawberry',
      type: 'Fruits',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/strawberry.jpg',
      quantity: 10,
      price: 1200,
    });
    const Item2 = await Item.create({
      name: 'Caramel Fudge',
      type: 'Karmel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/caramel-fudge.jpg',
      quantity: 10000,
      price: 186,
    });
    const Item3 = await Item.create({
      name: 'Pineapple Upside-down',
      type: 'Fruits',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/pineapple-upside-down.jpg',
      quantity: 100,
      price: 1200,
    });
    const Item4 = await Item.create({
      name: 'Caramel Apple',
      type: 'Karmel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/caramel-apple.jpg',
      quantity: 100,
      price: 1250,
    });
    const Item5 = await Item.create({
      name: 'Raspberry',
      type: 'Fruits',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/raspberry.jpg',
      quantity: 100,
      price: 1050,
    });
    const Item6 = await Item.create({
      name: 'Cinnamon',
      type: 'Vegan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/cinnamon.jpg',
      quantity: 100,
      price: 1300,
    });
    const Item7 = await Item.create({
      name: 'Coconut Cream',
      type: 'Vegan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/coconut-cream.jpg',
      quantity: 100,
      price: 1286,
    });
    const Item8 = await Item.create({
      name: 'Salted Caramel',
      type: 'Karmel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu nulla, sodales a velit at, pulvinar tempor velit.',
      imgUrl: 'cheesecakes/salted-caramel.jpg',
      quantity: 100,
      price: 1286,
    });

    const items = [Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8];

    await Customer.create({
      name: 'Gus',
      email: 'gustavoallen92@gmail.com',
      password: process.env.JWT,
      isAdmin: true,
    });
    return [...customers, ...items];
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
