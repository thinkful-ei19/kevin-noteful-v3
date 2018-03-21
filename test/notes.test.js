'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_MONGODB_URI } = require('../config');

const Note = require('../models/note');
const seedNotes = require('../db/seed/notes');

const expect = chai.expect;

chai.use(chaiHttp);



describe('Noteful api notes', function () {
  before(function () {
    return mongoose.connect(TEST_MONGODB_URI);
  });

  beforeEach(function () {
    // return mongoose.connection.db.dropDatabase()
    return Note.insertMany(seedNotes);
    // .then(() => Note.insertMany(seedNotes));
    // .then(() => Note.createIndexes());
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  // TESTS
  describe('DELETE /api/notes/:id', function () {
    it('should delete an item', function () {
      return chai.request(app)
        .delete('/api/notes/000000000000000000000000')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });
  });


  describe('PUT /api/notes/:id', function () {
    it('should update an item', function () {
      const newItem = {
        'title': 'The best article about cats ever!',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        'tags': []
      };
      return chai.request(app)
        .put('/api/notes/000000000000000000000000')
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'title', 'content');
          expect(res.body.id).to.equal('000000000000000000000000');
          expect(res.body.title).to.equal(newItem.title);
          expect(res.body.content).to.equal(newItem.content);
        });
    });
  });


  describe('POST /api/notes', function () {
    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'title': 'The best article about cats ever!',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        'tags': []
      };
      let body;
      // 1) first, call the api
      return chai.request(app)
        .post('/api/notes')
        .send(newItem)
        .then(function (res) {
          body = res.body;
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.json;
          expect(body).to.be.a('object');
          expect(body).to.include.keys('id', 'title', 'content');
          // 2) **then** call the database
          return Note.findById(body.id);
        })
        // 3) **then** compare
        .then(data => {
          expect(body.title).to.equal(data.title);
          expect(body.content).to.equal(data.content);
        })
        .catch(err => console.log(err));
    });
  });

  describe('GET /api/notes/:id', function () {
    it('should return correct notes', function () {
      let data;
      // 1) first, call the database
      return Note.findOne().select('id title content')
        .then(_data => {
          data = _data;
          // 2) **then** call the api
          return chai.request(app).get(`/api/notes/${data.id}`);
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;

          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('id', 'title', 'content', 'created');

          // 3) **then** compare
          expect(res.body.id).to.equal(data.id);
          expect(res.body.title).to.equal(data.title);
          expect(res.body.content).to.equal(data.content);
        });
    });
  });

  describe('GET /api/notes', function () {
    it('should return the correct number of Notes', function () {
      // 1) call the database and the api
      const dbPromise = Note.find();
      const apiPromise = chai.request(app).get('/api/notes');
      // 2) wait for both promises to resolve using `Promise.all`
      return Promise.all([dbPromise, apiPromise])
        // 3) **then** compare database results to api response
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });
  });
});


