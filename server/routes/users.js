const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Expense = require('../models/expense');
const Income = require('../models/income');

const expenseController = require('../controllers/expense-controllers')
const incomeController = require('../controllers/income-controller')

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Router for users and expense/income items.

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name, 
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:"Failed to register user"});
        } else {
            res.json({success: true, msg:"User registered"});
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username:user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success:false, msg: 'Wrong password'});
            }
        }); 
    })
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/expense', expenseController.list);
router.post('/expense', expenseController.save);
router.get('/expense/:id', expenseController.get);
router.put('/expense/:id', expenseController.update);
router.delete('/expense/:id', expenseController.delete);

// router.get('/income', incomeController.list);
// router.post('/income', incomeController.save);
// router.get('/income/:id', incomeController.get);
// router.put('/income/:id', incomeController.update);
// router.delete('/income/:id', incomeController.delete);

router.get('/income', incomeController.list);
router.post('/income', incomeController.save);
router.get('/income/:id', incomeController.get);
router.put('/income/:id', incomeController.update);
router.delete('/income/:id', incomeController.delete);

module.exports = router;