const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const { connectMongo } = require("./Database/mongoDB");
const { testMySQL } = require("./Database/mySQL");

const visitMiddleware = require('./Middleware/visit.middleware');

const authRoute = require("./Routes/auth.route");
const pageRoute = require("./Routes/page.route");
const cartRoute = require("./Routes/cart.route");

const app = express();
const PORT = 3000;

async function startServer() {
    try {

        await testMySQL();
        await connectMongo();
        console.log("DB MySQL et Mongo connectées");

        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "./Views/Pages"));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(express.static(path.join(__dirname, "../Front")));

        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60
            }
        }));

        app.use(visitMiddleware);

        app.use("/", pageRoute);
        app.use("/api/auth", authRoute);
        app.use("/cart", cartRoute);


        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);
        });

    } catch (err) {
        console.error("Erreur au démarrage du serveur :", err);
        process.exit(1);
    }
}

startServer();
