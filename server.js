const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
  saveUninitialized: true,
  secret: 'SessionSecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000
  }
};

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(session(sessionConfig));
app.use(cookieParser('alsdufhalskudfhlkashdf'));

app.use(express.static(path.join(__dirname, './public/dist')));

require('./server/config/database');

app.use('/api/user', require('./server/config/routes/user.routes'));
app.use('/api/bucketitem', require('./server/config/routes/bucket-item.routes'));
app.use(require('./server/config/routes/catch-all.routes'));

app.listen(port, console.log(`listening on ${port}`));