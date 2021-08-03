/* global describe beforeEach it */

const {expect} = require('chai')
const { db, models: { Customer } } = require('../index')
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');

describe('Customer model', () => {
  let customers;
  beforeEach(async() => {
    customers = (await seed()).customers;
  })

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the customer', async() => {
        const token = await customers.cody.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(customers.cody.id);
      })
    }) // end describe('correctPassword')
    describe('authenticate', () => {
      let customer;
      beforeEach(async()=> customer = await Customer.create({
        email: 'lucy@gmail.com',
        password: 'loo'
      }));
      describe('with correct credentials', ()=> {
        it('returns a token', async() => {
          const token = await Customer.authenticate({
            email: 'lucy@gmail.com',
            password: 'loo'
          });
          expect(token).to.be.ok;
        })
      });
      describe('with incorrect credentials', ()=> {
        it('throws a 401', async() => {

          try {
            await Customer.authenticate({
              email: 'lucy@gmail.com',
              password: '123'
            });
            throw 'nooo';
          }
          catch(ex){
            expect(ex.status).to.equal(401);
          }
        })

      });
    }) // end describe('authenticate')
  }) // end describe('instanceMethods')
}) // end describe('Customer model')
