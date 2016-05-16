var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var port = 3001;

app.use(cookieParser('S3CREt'));
//app.use(expressSession());

app.use(express.static('public'));
app.use(express.static('templates'));

app.set('view engine', 'html');

app.use('*', function (req, res) {
		/*if(true){
			console.log("index");
			res.render(__dirname + '/templates/main.html');
			//res.render('/main');
		}else{
			console.log("login");
			res.render(__dirname + '/templates/login.html');
		}*/
});

app.listen(process.env.PORT || port, function(err){
    console.log('running server on port ' + port);
});