const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require("jsonwebtoken");
const User = require('./models/user-model')
const {Strategy} = require('passport-google-oauth20');


const articleRouter = require('./routes/article-router');
const trainerRouter = require('./routes/trainer-router');
const trainingTypeRouter = require('./routes/training-type-router');
const trainingRouter = require('./routes/training-router');

const db = require('./db');
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const apiPort = 3000;

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'your-secret-key', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session(undefined));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post("/api/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
    console.log(req);
    User.findOne({email: email}).then((user) => {
        bcrypt.compare(password, user.password)
            .then((passwordCheck) => {
                if (!passwordCheck) {
                    return res.status(400).send({
                        message: "Passwords does not match",
                    });
                }
                const token = jwt.sign(
                    {
                        userEmail: email,
                    },
                    "RANDOM-TOKEN",
                    {expiresIn: "24h"}
                );
                res.status(200).send({
                    message: "Login Successful",
                    email: email,
                    token,
                });
            }).catch((error) => {
            res.status(401).send({
                message: "Passwords does not match",
                error,
            });
        });
    }).catch((e) => {
        res.status(401).send({
            message: "Email not found",
            e,
        });
    });


})

app.use('/api', articleRouter);
app.use('/api', trainerRouter);
app.use('/api', trainingTypeRouter);
app.use('/api', trainingRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));

passport.use(new Strategy({
        clientID: '958183426310-osp5ua67lv8n90i3h1ieti6rvqk7reiv.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },

    (accessToken, refreshToken, profile, done) => {
        console.log(`accessToken: ${accessToken}`);
        return done(null, profile);
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        const token = jwt.sign(
            {
                userEmail: req.user._json.email,
            },
            "RANDOM-TOKEN",
            {expiresIn: "24h"}
        );
        res.redirect(`http://localhost:8000/?token=${token}`);
    }
);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
