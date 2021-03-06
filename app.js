// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/")(app);
require("./config/session.config")(app)



// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "PROJECT";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const musiciansRoutes = require("./routes/musicians.routes");
app.use('/', musiciansRoutes);

const bandsRoutes = require("./routes/bands.routes.js");
app.use('/bands', bandsRoutes);


const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const authBandRoutes = require('./routes/authband.routes');
app.use('/', authBandRoutes);

const discoverRoutes = require('./routes/index.routes');
app.use('/', discoverRoutes);

// const profileRoutes = require('./routes/auth.routes');
// app.use('/', profileRoutes);

const preSignupRoute = require('./routes/presignup.routes');
app.use("/", preSignupRoute);

const preLoginRoute = require('./routes/prelogin.routes');
app.use("/", preLoginRoute);

const connectRoute = require('./routes/request.routes');
app.use("/", connectRoute);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
