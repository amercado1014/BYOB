const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the home page', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      })
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      })
  });
})