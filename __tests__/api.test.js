const request = require("supertest");
const app = require("../app")
const db=require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data");
const { forEach } = require("../db/data/test-data/articles");

beforeEach(() => seed(testData));

afterAll(() => {
    if(db.end) db.end();
})

describe("GET api/topics", () =>{
    test ("Responds with a 200 status", () => {
        return request(app).get("/api/topics").expect(200)

    })
    test("Responds with an array of topic objects which containg the properties `slug' and `description'", () =>{
    return request(app)
      .get("/api/topics")
      .then(({body}) => {
        
        expect(body.topics).toBeInstanceOf(Array);

        body.topics.forEach((element) => {
            expect(body.topics.length).toBe(3)

            expect(element).toEqual(           
            expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String)
                })
             ) 
            })   
        })
    })
 
})
