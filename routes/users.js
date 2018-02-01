let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')
const MONGO_URI = require('../config').MONGO_URI
const MONGO_SCHEMA = require('../config').MONGO_SCHEMA

mongoose.connect(MONGO_URI);
const User = mongoose.model('User', MONGO_SCHEMA);

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       firstname:
 *         type: string
 *       age:
 *         type: string
 *       sex:
 *         type: string
 *       adress: 
 *         type: string
 *       password: 
 *         type : string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/', (req, res, next) => {
  User.find((err, user) => {
    if (err) return console.log(err)
    res.send(user)
  })
});




/**
 * @swagger
 * /users/new:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/new', (req, res, next) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) return console.log(err)
    res.sendStatus(200);
  })
});

/**
 * @swagger
 * /users/delete:
 *   post:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user mongoDb id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.post('/delete', (req, res, next) => {
  User.findByIdAndRemove(req.body._id, (err, user) => {
    if (err) { res.send(500) }
    res.sendStatus(200)
  })
});


/**
 * @swagger
 * /users/find:
 *   post:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user mongoDb id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/User'
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
