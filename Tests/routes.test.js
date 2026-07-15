const request = require("supertest");
const {app, startServer}  = require("../Back/server");

beforeAll(async()=>{
    await startServer();
});

describe("Tests des routes principales", ()=>{

    test("La page réservation est accessible", async()=>{

        const response = await request(app).get("/reservation");

        expect(response.statusCode).toBe(200);

    });

    test("Un utilisateur non connecté ne peut pas accéder au panier", async()=>{


        const response = await request(app).get("/cart");

        expect(response.statusCode).toBe(401);

    });


    test("Un utilisateur non admin ne peut pas accéder à l'administration", async()=>{


        const response = await request(app).get("/admin");

        expect([401,403])
            .toContain(response.statusCode);

    });

});