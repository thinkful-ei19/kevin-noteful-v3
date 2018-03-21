'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Note = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/notes', (req, res) => {

  const searchTerm = req.query.searchTerm;

  if (searchTerm) {
    return Note.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .then(results => {
        res.json(results);
      })
      .catch(console.error);
  } else {
    return Note.find()
      .then(results => {
        res.json(results);
      });
  }
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/notes/:id', (req, res) => {

  const id = req.params.id;

  return Note.findById(id)
    .then(results => {
      res.json(results);
    })
    .catch(console.error);
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/notes', (req, res) => {
  let obj = {
    title: req.body.title,
    content: req.body.content
  };

  return Note.create(obj)
    .then(result => {
      res.location(`/notes/${result.id}`).status(201).json(result);
      // console.log(result);
    })
    .catch(console.error);
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res) => {

  const id = req.params.id;

  let obj = {
    title: req.body.title,
    content: req.body.content
  };

  return Note.findByIdAndUpdate(id, obj, { new: true })
    .then(results => {
      res.status(201).json(results);
      console.log(results);
    })
    .catch(console.error);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res) => {

  const id = req.params.id;

  return Note.findByIdAndRemove(id)
    .then(results => {
      res.status(204).json(results);
      console.log(results);
    })
    .catch(console.error);
});

module.exports = router;