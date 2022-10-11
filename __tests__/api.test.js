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
  test("Responds with a 200 status", () => {
    return request(app).get("/api/articles/1").expect(200)
    })
  test("Responds with an `article` object with the properties of `author`, `title`,`article_id`,`body`,`topic`,`created_at`, `votes`", () => {
    return request(app).get("/api/articles/2")
     .then(({body}) => {
      const article = body.rows[0]
  
      expect(article).toEqual(
        expect.objectContaining({
         author: expect.any(String),
         votes: expect.any(Number),
         article_id: expect.any(Number),
         created_at: expect.any(String),
         body: expect.any(String),
         topic: expect.any(String),
         title: expect.any(String)
        })
      )

      expect(article.article_id).toEqual(2)
    


        })
    })
  test ("If the client has entered an article id that isn't valid, the server should respond with `400: Bad Request`", () => {

    return request(app)
    .get("/api/articles/wrong-id")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })

  })
  test ("If the client has entered an article that is valid but doesn't exist, the server should respond with `404: Not Found`", () => {
    return request(app)
    .get("/api/articles/1234567")
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })
    
})

describe("PATCH /api/articles/:article_id",() => {
  test("Server responds with a 200 status if request is successfull", () => {
    return request(app)
    .patch("/api/articles/2")
    .expect(200)
  })


})

