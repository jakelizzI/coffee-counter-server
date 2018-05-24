import express from 'express';
import User from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.type('json');
  User.find({}, (err, obj) => {
    res.json(obj);
  });
});

router.post('/', (req, res) => {
  console.log('body');
  console.log(req.body);

  res.type('json');
  res.json(req.body);
});

router.get('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  User.find({ id: userId }, (err, obj) => {
    res.json(obj);
  });
});


module.exports = router;
