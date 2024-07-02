const express = require('express');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const userRoutes = require('./router');

const app = express();
const port = 3000;

let session = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "html");
nunjucks.configure("./views", {
    express: app,
    watch: true
});

app.use('/', express.static("./public"));

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.setHeader("Set-Cookie", "token=1");
  res.render("index3.html");
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
