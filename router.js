const express = require('express');
const router = express.Router();
const { findUser, users } = require('./user');

// 로그인 페이지
router.get('/login', (req, res) => {
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

//로그인 처리
router.post('/login', (req, res) => {
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

// 사용자 프로필
router.get('/profile', (req, res) => {
  let sessionId = req.cookies['connect.id'];
  let userData = session[sessionId];

  console.log(userData);

  if (sessionId) {
    res.render('./user/profile.html', {
      userData
    });
  }
});

// 로그인 폼
router.get('/login-form', (req, res) => {
  let msg = req.query.msg;
  res.render('./user/login.html', {
    msg
  });
});

// 쿠키 확인
router.get('/cookie', (req, res) => {
    let cookie = req.headers.cookie;
  
    if (cookie === undefined) {
      res.send("<h1>There is no cookie</h1>");
    } else {
      res.send(`<h1>Cookie: ${cookie}</h1>`);
    }
  });


module.exports = router;