const request = require("supertest");
const {app, startServer} = require("../Back/server");

beforeAll(async()=>{
    await startServer();
});

test("Un utilisateur simple ne peut pas accéder à l'administration", async()=>{

    const login = await request(app)
        .post("/api/auth/login")
        .send({
            email:"test.jest@gmail.com",
            password:"test1234"
        });


    const response = await request(app)
        .get("/admin")
        .set(
            "Cookie",
            login.headers["set-cookie"]
        );


    expect(response.statusCode)
        .toBe(403);

});