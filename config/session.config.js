const session = require('express-session');

const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

module.exports = app => {
 
    app.set('trust proxy', 1);

    app.use(
        session({
            secret: 'keyboardcat',
            resave: true,
            saveUninitialized: false,
            cookie:{
                httpOnly: true,

            },
            store: MongoStore.create({
                mongoUrl: 'mongodb://localhost/band-match',
                ttl: 60 * 60 * 24
            })
        })
    )
}