const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const product = require('./models/products');
const Order = require('./models/Order');
const path = require('path');
const app = express();
const fileOperations = require('./fileOperations');

// Call the function to update the file
fileOperations.updateFile();


const productsRouter = require('/routes/products');
app.use('/', productsRouter);

// Load environment variables from .env file
dotenv.config();


app.set('view engine', 'ejs');

app.set('/views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => {
    res.render('index');
});


// Connect to MongoDB
mongoose.connect('mongodb+srv://cardigamiguel221:Dropshipping22@mcnsblogtest.ngpfkjm.mongodb.net/MCNSBLOGTEST', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
    });
}
));

// Import routes
const user = require('./routes/user');
const products = require('./routes/products');
const orders = require('./routes/orders');

// Use routes
app.use('/user', user);
app.use('/products', products);
app.use('/orders', orders);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



