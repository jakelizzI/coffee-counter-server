import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import index from './routes/index';
import users from './routes/users';

const app = express();

mongoose.connect('mongodb://localhost/coffee-counter');
mongoose.connection.on('connected', () => {
  console.log('connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', index);
app.use('/users', users);

app.listen(3000, () => {
  console.log('server listenning on port 3000');
});
