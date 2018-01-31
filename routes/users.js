let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')
const MONGO_URI = require('../config').MONGO_URI
const MONGO_SCHEMA = require('../config').MONGO_SCHEMA

mongoose.connect(MONGO_URI);
const User = mongoose.model('User', MONGO_SCHEMA);

/* GET users. */
router.get('/', (req, res, next) => {
  User.find((err, user) => {
    if (err) return console.log(err)
    res.send(user)
  })
});

/* POST user. */
router.post('/new', (req, res, next) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) return console.log(err)
    res.sendStatus(200);
  })
});

/**
 * DELETE user.
 */
router.post('/delete', (req, res, next) => {
  User.findByIdAndRemove(req.body._id, (err, user) => {
    if (err) { res.send(500) }
    res.sendStatus(200)
  })
});
/**
 * GET one user
 */
router.post('/find', (req, res, next) => {
  User.findById(req.body._id, (err, user) => {
    if (err) return res.send(500)
    res.send(user)
  })
});

router.post('/update', (req, res, next) => {
  User.findById(req.body._id, (err, user) => {
    if (err) return res.send(500)
    delete req.body._id
    user.set(req.body);
    user.save((err, user) => {
      if (err) return handleError(err);
      res.send(user);
    })

  });
})


module.exports = router;
