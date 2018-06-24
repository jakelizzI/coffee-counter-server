import express from 'express';
import User from '../models/user';
import PaymentHistory from '../models/paymentHistory';

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
  PaymentHistory.find({}, (err, obj) => {
    res.json(obj);
  });
});

router.get('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  PaymentHistory.find({ userid: userId }, (err) => {
    res.json(response(err));
  });
});

router.post('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  const balance = Number(req.body.balance);

  const paymentHistory = new PaymentHistory({
    userId,
    balance,
    timestamp: new Date(),
  });

  // 購入履歴の挿入
  paymentHistory.save((err) => {
    if (err) {
      res.json(err);
    }
  });

  // userのbalanceの更新
  User.find({ id: userId }, (err, result) => {
    if (err) {
      console.log(err);
    }

    User.findOneAndUpdate(
      // 検索条件
      { id: userId },
      // 更新内容
      { balance: result.balance + balance },
      // callback
      (UserErr) => { res.json(response(UserErr)); },
    );
  });
});

module.exports = router;
