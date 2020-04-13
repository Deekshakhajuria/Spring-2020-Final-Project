let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    path = require('path'),
    passport = require('passport'),
    config = require('./config/database'),
    users = require('./routes/users'),
    cors = require('cors');

    
// mongoose instance connect to database url
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database)
});
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err)
});
mongoose.Promise = global.Promise;

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Enabling CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Start the app 
app.use('/users', users)

app.get('/',(req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port);
console.log('Server started on: ' + port);