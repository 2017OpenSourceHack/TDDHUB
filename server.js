var http            = require('http'),
    express         = require('express'),
    path            = require('path'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', express.static('public'));
// app.use('/signup', express.static('public/signup.html'));
// app.use('/login', express.static('ui/loginpage.html'));
// app.use('/projects', express.static('public/project_list.html'));
app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});


require('./route')(app);

var port = process.env.PORT || 3010;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
