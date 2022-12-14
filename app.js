// Setup server, session and middleware here.
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const configRoutes = require("./routes");
const { users } = require("./config/mongoCollections");


const app = express();
const static = express.static(__dirname + "/public");
let database, collection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", static);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "YASMPAuthCookie",
    secret: "Our secrets are ours to keep",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

// MIDDLEWARE GOES BELOW:

app.use(async (req, res, next) => {
  const dateString = new Date().toUTCString();
  const reqMethod = req.method;
  const reqRoute = req.originalUrl;
  console.log(`[${dateString}]: ${reqMethod} ${reqRoute}`);
  next();
});

// MIDDLEWARE ENDS HERE

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
