const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const { connectMongo } = require("./Database/mongoDB");

const visitMiddleware = require('./Middleware/visit.middleware');

const authRoute = require("./Routes/auth.route");
const pageRoute = require("./Routes/page.route");
const cartRoute = require("./Routes/cart.route");
const adminRoute = require("./Routes/admin.route");
const ticketRoute = require("./Routes/ticket.route");
const accountRoute = require("./Routes/account.route");

const app = express();
const PORT = 3000;

async function startServer(){

    await connectMongo();

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "./Views/Pages"));

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use(express.static(path.join(__dirname,"../Front")));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*60
        }
    }));

    app.use(visitMiddleware);


    app.use("/", pageRoute);
    app.use("/api/auth", authRoute);
    app.use("/cart", cartRoute);
    app.use("/admin", adminRoute);
    app.use("/ticket", ticketRoute);
    app.use("/account", accountRoute);


}


if(require.main === module){

    startServer()
        .then(()=>{
            app.listen(PORT, ()=>{
                console.log(`Serveur lancé sur ${PORT}`);
            });
        })
        .catch(err=>{
            console.error(err);
        });

}


module.exports = {
    app,
    startServer};