import express from 'express';
import User from '../models/user';

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

/**
 * 全情報を取得する
 */
router.get('/', (req, res) => {
  res.type('json');
  User.find({}, (err, obj) => {
    res.json(obj);
  });
});

/**
 * user collection の id に紐づく情報を取得する。
 */
router.get('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  User.find({ id: userId }, (err) => {
    res.json(response(err));
  });
});

/**
 * user collection に新しいUserを追加する。
 * その際のbalanceに関してはデフォルトで0にする。
 */
router.post('/', (req, res) => {
  res.type('json');
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    balance: 0,
  });
  user.save((err) => {
    res.json(response(err));
  });
});

/**
 * user collection の id に紐づく document を探し出し、requestにあるもので上書き。
 * 上書きするのは name と balance のみ
 */
router.put('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);

  const reqName = req.body.name;
  const reqBalance = req.body.balance;

  const userData = {};

  if (reqName) userData.name = String(reqName);
  if (reqBalance) userData.balance = Number(reqBalance);

  User.findOneAndUpdate(
    // 検索条件
    { id: userId },
    // 更新内容
    userData,
    // callback
    (err) => { res.json(response(err)); },
  );
});

/**
 * user collection の id に紐づく document を探し出し、削除する。
 */
router.delete('/:userId', (req, res) => {
  res.type('json');
  const userId = String(req.params.userId);
  User.findOneAndRemove({ id: userId }, (err) => {
    res.json(response(err));
  });
});

module.exports = router;
