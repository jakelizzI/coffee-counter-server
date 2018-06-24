import express from 'express';
import PurchaseHistory from '../models/purchaseHistory';

const router = express.Router();

/**
 * errがあった場合はNG、なければOKを返す
 * @param {} err
 */
const response = (err) => {
  if (err) {
    return { result: 'NG' };
  }
  return { result: 'OK' };
};

router.get('/', (req, res) => {
  res.type('json');
  PurchaseHistory.find({}, (err, obj) => {
    res.json(obj);
  });
});

router.get('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  PurchaseHistory.find({ userid: userId }, (err) => {
    res.json(response(err));
  });
});

router.post('/:userId', (req, res) => {
  res.type('json');

  // countは1固定
  const purchaseHistory = new PurchaseHistory({
    userId: String(req.params.userId),
    count: 1,
    timestamp: new Date(),
  });

  purchaseHistory.save((err) => {
    res.json(response(err));
  });
});

module.exports = router;
