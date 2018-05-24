import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.type('json');
  res.json({ name: 'index' });
});

module.exports = router;
