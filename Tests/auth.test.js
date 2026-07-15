const request = require("supertest");
const {app, startServer} = require("../Back/server");

beforeAll(async()=>{
    await startServer();
});

const testEmail = `test${Date.now()}@gmail.com`;

describe("Authentification", ()=>{


    test("Création d'un compte utilisateur", async()=>{

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                email:testEmail,
                password:"test1234"
            });

        expect([200,201])
            .toContain(response.statusCode);
    });

    test("Connexion utilisateur", async()=>{

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email:testEmail,
                password:"test1234"
            });

        expect(response.statusCode)
            .toBe(200);

    });

});

test("Inscription impossible sans email", async()=>{


const response = await request(app)
.post("/api/auth/register")
.send({
    password:"test1234"
});


expect(response.statusCode)
.toBeGreaterThanOrEqual(400);


});