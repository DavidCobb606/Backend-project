const request = require("supertest");
const app = require("../app")
const db=require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data");


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
        expect(body.topics.length).toBe(3)
        body.topics.forEach((element) => {            
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

describe("GET api/articles/:article_id", () => {
    test ("Responds with a 200 status", () => {
        return request(app).get("/api/articles/1").expect(200)
    })
    test("Responds with an `article` object with the properties of `author`, `title`,`article_id`,`body`,`topic`,`created_at`, `votes`", () => {
        return request(app).get("/api/articles/:article")
    })
})