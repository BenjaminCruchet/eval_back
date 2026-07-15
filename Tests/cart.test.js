const request = require("supertest");
const {app, startServer} = require("../Back/server");

beforeAll(async()=>{
    await startServer();
});

test("Ajout d'un concert au panier", async()=>{


const login = await request(app)
.post("/api/auth/login")
.send({
    email:"test.jest@gmail.com",
    password:"test1234"
});


const response = await request(app)
.post("/cart/add")
.set(
    "Cookie",
    login.headers["set-cookie"]
)
.send({
    concertId:1,
    quantity:2
});


expect(response.statusCode)
.toBe(201);


});