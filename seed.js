const { db, models: { Customer, Item, } }= require('./server/db');

const seed = async () => {

  try {
    await db.sync({ force: true });

    const emails = ['Duane@gmail.com','Francis@gmail.com','Fabiola@gmail.com','Lenna@gmail.com','Viviana@gmail.com','Val@gmail.com','Latosha@gmail.com','Nancie@gmail.com','Reina@gmail.com','Torie@gmail.com','Rosemary@gmail.com','Fredrick@gmail.com','Nola@gmail.com','Trudie@gmail.com','Carri@gmail.com','Freeda@gmail.com','Jannette@gmail.com','Catalina@gmail.com','Miyoko@gmail.com','Yuki@gmail.com','Chelsea@gmail.com','Petra@gmail.com','Yasmine@gmail.com','Lashawn@gmail.com','Kina@gmail.com','Enola@gmail.com','Randi@gmail.com','Nina@gmail.com','Rochelle@gmail.com','Siu@gmail.com','Norma@gmail.com','Apolonia@gmail.com','Hermine@gmail.com','Leonie@gmail.com','Jessia@gmail.com','Joya@gmail.com','Kelle@gmail.com','Fredda@gmail.com','Synthia@gmail.com','Rachel@gmail.com','Jospeh@gmail.com','Oren@gmail.com','Douglas@gmail.com','Mignon@gmail.com','Beverley@gmail.com','Melissia@gmail.com','Gwenda@gmail.com','Demarcus@gmail.com','Garrett@gmail.com','Lasonya@gmail.com']

    const customers = [];
    for (let i = 0; i < 50; i++) {
      customers.push(await Customer.create({email: emails[i], password: 'password'}))
    }

    const Item1 = await Item.create({name: 'Strawberry'})
    const Item2 = await Item.create({name: 'Blueberry'})
    const Item3 = await Item.create({name: 'Lemon'})

    for (let i = 0; i < 5; i++) {
      await Item1.addCustomer(customers[i]);
      await Item2.addCustomer(customers[i]);
      await Item3.addCustomer(customers[i]);
    }

    return [...customers]

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
