const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../Front")));

const authRoutes = require("./Routes/AuthRoute");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1h
    }
}));

app.get("/", (req, res) => {
res.send("Accès API fonctionnel !");
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`le server est lancé sur le port : ${PORT}`);
});

