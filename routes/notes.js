'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Note = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/notes', (req, res, next) => {

  mongoose.connect(MONGODB_URI)
    .then(() => {
      const searchTerm = req.query.searchTerm;
      let filter = {};

      if (searchTerm) {
        const re = new RegExp(searchTerm, 'i');
        filter.title = { $regex: re };
      }

      return Note.find(filter)
        .sort('created')
        .then(results => {
          res.json(results);
        })
        .catch(console.error);
    })
    .then(() => {
      return mongoose.disconnect()
        .then(() => {
          console.info('Disconnected');
        });
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
      next(err);
    });

});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/notes/:id', (req, res, next) => {

  mongoose.connect(MONGODB_URI)
    .then(() => {
      const id = req.params.id;

      return Note.findById(id)
        .then(results => {
          res.json(results);
        })
        .catch(console.error);
    })
    .then(() => {
      return mongoose.disconnect()
        .then(() => {
          console.info('Disconnected');
        });
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
      next(err);
    });

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/notes', (req, res, next) => {

  mongoose.connect(MONGODB_URI)
    .then(() => {

      let obj = {
        title: req.body.title,
        content: req.body.content
      };

      return Note.create(obj)
        .then(results => {
          res.json(results);
          console.log(results);
        })
        .catch(console.error);
    })
    .then(() => {
      return mongoose.disconnect()
        .then(() => {
          console.info('Disconnected');
        });
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
      next(err);
    });

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res, next) => {

  mongoose.connect(MONGODB_URI)
    .then(() => {
      const id = req.params.id;

      let obj = {
        title: req.body.title,
        content: req.body.content
      };

      return Note.findByIdAndUpdate(id, obj, { new: true })
        .then(results => {
          res.json(results);
          console.log(results);
        })
        .catch(console.error);
    })
    .then(() => {
      return mongoose.disconnect()
        .then(() => {
          console.info('Disconnected');
        });
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
    });

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res, next) => {

  console.log('Delete a Note');
  res.status(204).end();

});

module.exports = router;