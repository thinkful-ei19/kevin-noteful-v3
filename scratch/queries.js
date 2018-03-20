'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Note = require('../models/note');


/* ----- Get All Notes ----- */
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const searchTerm = 'lady gaga';
//     let filter = {};

//     if (searchTerm) {
//       const re = new RegExp(searchTerm, 'i');
//       filter.title = { $regex: re };
//     }

//     return Note.find(filter)
//       .sort('created')
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });




/* ----- Get Note By ID ----- */
// mongoose.connect(MONGODB_URI)
// .then(() => {
//   const id = '000000000000000000000006';
//   // const id = req.params.id;

//     return Note.findById(id)
//       .then(results => {
//         // res.json(results);
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });



/* ----- Create New Note (POST) ----- */

// mongoose.connect(MONGODB_URI)
//   .then(() => {

//     let obj = {
//       title: 'testing',
//       content: 'testing testing 123'
//     };

//     // let obj = {
//     //   title: req.body.title,
//     //   content: req.body.content
//     // };

//     return Note.create(obj)
//       .then(results => {
//         // res.json(results);
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });


/* ----- Update Existing Note (PUT) ----- */

// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const id = '000000000000000000000006';
//     // const id = req.params.id;

//     const obj = {
//       title: 'testing',
//       content: 'testing testing 123'
//     };

//     // let obj = {
//     //   title: req.body.title,
//     //   content: req.body.content
//     // };

//     return Note.findByIdAndUpdate(id, obj)
//       .then(results => {
//         // res.json(results);
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });


  /* ----- Delete Note ----- */

  mongoose.connect(MONGODB_URI)
  .then(() => {
    const id = '000000000000000000000006';
    // const id = req.params.id;

    const obj = {
      title: 'testing',
      content: 'testing testing 123'
    };

    // let obj = {
    //   title: req.body.title,
    //   content: req.body.content
    // };

    return Note.findByIdAndUpdate(id, obj)
      .then(results => {
        // res.json(results);
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