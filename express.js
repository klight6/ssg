const express = require('express');
const nunjucks = require('nunjucks');
const { findUser, users } = require('./user');
const cookieParser = require('cookie-parser'); 
const app = express();
const port = 3000;


let session = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

nunjucks.configure("./views", {
    express: app,
    watch: true
});

app.use('/', express.static("./public"));

app.get('/', (req, res) => {
  res.setHeader("Set-Cookie", "token=1");
  res.render("index3.html");
});

app.get('/login', (req, res) => {
  if (req.headers.cookie) {
    let data = req.headers.cookie;
    let sessionId = data.split('=')[1];
    res.render('index_login.html', {
      sessionId
    });
  } else {
    res.render("index4.html");
  }
});

app.get("/user/login", (req, res) => {
  let msg = req.query.msg;
  res.render('./user/login.html', {
    msg
  });
});

app.post("/user/login", (req, res) => {
  let { userid, userpw } = req.body;

  let loginFlag = findUser(userid, userpw);
  if (loginFlag) {
    const privateKey = parseInt(Math.random() * 10000000000).toString();
    const item = users.find(v => v.userid === userid);
    session[privateKey] = item;

    res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`);
    res.redirect('/login');
  } else {
    res.redirect('/user/login?msg=아이디와 패스워드가 일치하지 않습니다.');
  }
});

app.get('/user/profile', (req, res) => {
  let sessionId = req.cookies['connect.id'];
  let userData = session[sessionId];

  if (userData) {
    res.render('./user/profile.html', {
      userData
    });
  } else {
    res.redirect('/user/login?msg=세션이 유효하지 않습니다.');
  }
});

app.get('/cookie', (req, res) => {
  let cookie = req.headers.cookie;

  if (cookie === undefined) {
    res.send("<h1>There is no cookie</h1>");
  } else {
    res.send(`<h1>Cookie: ${cookie}</h1>`);
  }
});

app.get('/hello', (req, res) => {
  let name = req.query.name;
  let height = req.query.height;
  res.render('index2.html', { user: name, height: height });
});

app.post('/hello', (req, res) => {
  res.send("<h1>post 방식의 요청입니다.</h1>");
});

app.get('/numjucks', (req, res) => {
  let date = "2024.06.04";
  res.render('index.html', { today: date });
});

app.get('/express', (req, res) => {
  res.send("<h1>Hello SSG</h1>");
});

app.listen(port, () => {
  console.log("server onload");
});
