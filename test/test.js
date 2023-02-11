const request = require('supertest');
const chai = require('chai');
const app = require('../app');
const expect = chai.expect

describe('GET /items', () => {
  it('should return an empty array if there are no bills',  async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).to.be.eql(200);
    expect(response.body.data).to.be.eql([]);
  });

  it('should return the list of bills if there are any',  async () => {
    const bill = {
      patientNameAddress: 'John Doe',
      hospitalName: 'General Hospital',
      serviceDate: '2023-02-11',
      amount: 100
    };
    await request(app).post('/api/items').send(bill);
    const response = await request(app).get('/api/items');
    expect(response.statusCode).to.be.eql(200);
    expect(response.body.data).to.be.eql([bill]);
  });
});

describe('POST /items', () => {
  it('should return the newly created bill', async () => {
    const bill = {
      patientNameAddress: 'John Doe',
      hospitalName: 'General Hospital',
      serviceDate: '2023-02-11',
      amount: 100
    };
    const response = await request(app).post('/api/items').send(bill);
    expect(response.statusCode).to.be.eql(200);
    expect(response.body.data).to.be.eql(bill);
  });
});

describe('POST /bulk-items', () => {
  it('should return the newly created bills', async () => {
    const bill = [{
      patientNameAddress: 'John Doe',
      hospitalName: 'General Hospital',
      serviceDate: '2023-02-11',
      amount: 100
    },{
      patientNameAddress: 'Man Boe',
      hospitalName: 'Government Hospital',
      serviceDate: '2024-02-11',
      amount: 400
    }];
    const response = await request(app).post('/api/bulk-items').send(bill);
    expect(response.statusCode).to.be.eql(200);
    expect(response.body.bulkData).to.be.eql(bill);
  });
});
