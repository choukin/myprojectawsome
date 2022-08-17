var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const message = require('./middleware/messages')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const register = require('./routes/register') 
const login = require('./routes/login')
const entries = require('./routes/entries')
const validate = require('./middleware/validate')
const user = require('./middleware/user')
const api = require('./routes/api')
const auth = require('./middleware/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 有颜色区分的日志，方便开发调试
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 解析请求体
app.use(cookieParser());

app.use(session({
  // 一个String类型的字符串，作为服务器端生成session的签名。
  secret: 'secret',
  // 当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
  resave: false,
  // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
  saveUninitialized: true
}))

app.use('/api',auth,api)

app.use(user)
app.use(message)
// 提供/public下的静态文件
app.use(express.static(path.join(__dirname, 'public')));
// 指定程序路由
app.get('/post', entries.form)

app.post('/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]'),
  entries.submit)

app.use('/users', usersRouter);

app.get('/register', register.form)
app.post('/register', register.submit)

app.get('/login', login.form)
app.post('/login', login.submit)
app.get('/logout', login.logout)

app.use('/', entries.list);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
