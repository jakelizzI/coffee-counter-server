import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import index from './routes/index';
import users from './routes/users';
import payment from './routes/payment';
import purchase from './routes/purchase';

const app = express();

mongoose.connect('mongodb://localhost/coffee-counter');
mongoose.connection.on('connected', () => {
  console.log('connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', index);
app.use('/users', users);
app.use('/payment', payment);
app.use('/purchase', purchase);

app.listen(3000, () => {
  console.log('server listenning on port 3000');
});
