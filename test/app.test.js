const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /playstoreApps', () => {
  it('should return an array of applications', () => {
    return request(app)
      .get('/playstoreApps')
      .query({sort: 'app', genres: 'action'})
      .expect(200)
      .expect('Content-Type', /json/)
  })
})