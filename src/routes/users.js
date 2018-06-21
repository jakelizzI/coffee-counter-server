import express from 'express';
import User from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.type('json');
  User.find({}, (err, obj) => {
    res.json(obj);
  });
});

router.get('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  User.find({ id: userId }, (err, result) => {
    if (err) {
      res.json(result);
    } else {
      res.json(err);
    }
  });
});

router.post('/', (req, res) => {
  res.type('json');
  const user = new User({
    id: req.body.id,
    name: req.body.name,
  });
  user.save();
  res.json({
    result: 'OK',
  });
});

router.delete('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  User.findOneAndRemove({ id: userId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
