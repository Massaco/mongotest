// BASE SETUP
// =============================================================================
var mongoose    = require('mongoose');
var express     = require('express');
var helmet      = require('helmet');  
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt         = require('jsonwebtoken');  // used to create, sign, and verify tokens
var config      = require('./config');      // get our config file
var app         = express();                // define our app using express
var cors        = require('cors')

app.use(bodyParser.urlencoded({ extended: true })); // configure app to use bodyParser()
app.use(bodyParser.json()); // this will let us get the data from a POST

app.use(morgan('dev'));

var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to our database
//app.set('superSecret', config.secret);

app.use(helmet());

// app.use(function(req, res, next) {
//   // var headers = {};
//   // headers['Access-Control-Allow-Origin'] = '*';
//   // headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With';
//   // headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
//   // headers["Access-Control-Max-Age"] = '86400';
//   // res.writeHead(200, headers);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
//   res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//   if (req.method === 'OPTIONS') {
//       console.log('OPTIONS SUCCESS');
//       // IE8 does not allow domains to be specified, just the *
//       // headers["Access-Control-Allow-Origin"] = req.headers.origin;      
//       res.end();
//   } else {
//     next();
//   }
//       // res.header("Access-Control-Allow-Origin", "*");
//       // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
//       // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });

//Enabling CORS Pre-Flight
// app.options('/api', cors());
// app.use('/api', cors(), require('./server/routes/api'));

//Enabling CORS
app.use(cors());
app.use('/api', require('./server/routes/api'));


app.get('/', function(req, res) {
  res.send('Hello! The API is at http://express--api.herokuapp.com:' + port + '/api');  
});
//console.log(router.stack)
// START THE SERVER
// =============================================================================
//console.log(app._router.stack)
app.listen(port);
console.log('Start on port: ' + port);