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
                })) 
            })   
        })
    })
})

describe("GET api/articles/:article_id", () => {
  test("Responds with a 200 status", () => {
    return request(app).get("/api/articles/1").expect(200)
    })
  test("Responds with an `article` object with the properties of `author`, `title`,`article_id`,`body`,`topic`,`created_at`, `votes`, `comment_count`", () => {
    return request(app).get("/api/articles/2")
     .then(({body}) => {
      const article = body.articles[0]
      expect(article.article_id).toEqual(2)
      expect(article).toEqual(
        expect.objectContaining({
         author: expect.any(String),
         votes: expect.any(Number),
         article_id: expect.any(Number),
         created_at: expect.any(String),
         body: expect.any(String),
         topic: expect.any(String),
         title: expect.any(String),
         comment_count: "0"
        }))
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
      .expect(404)
      .then(({body}) => {
        
        expect(body.msg).toBe("Not Found")
      })
    }) 
   
})

describe("GET api/users", () => {
  test("Responds with a 200 status", () => {
    return request(app).get("/api/users").expect(200)
  })
  test("Should respond with an array of objects which have the properties `username`, `name`, and `avatar_url`", () => {
    return request(app)
    .get("/api/users")
    .then(({body}) => {
        const users = body.users

    expect(users).toBeInstanceOf(Array)
    expect(users.length).toBe(4)
     users.forEach((element) => {
        expect(element).toEqual(
            expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String)
            }))
          })
        })
  })

})

describe("PATCH /api/articles/:article_id",() => {
  test("Server responds with a 200 status and an updated article where the votes have been modified accordingly", () => {
    return request(app)
    .patch("/api/articles/2")
    .send({inc_votes: 100})
    .then(({body}) => {
      expect(body.articles.article_id).toEqual(2)
      expect(200)
      expect(body).toEqual({
        articles: {
          article_id: 2,
          title: expect.any(String),
          topic: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 100,
          author: expect.any(String)
        }
      })
    })
  })
  test ("Server responds with `400: Bad Request` if the client has sent the body in an invalid form", () => {
    return request(app)
    .patch("/api/articles/1")
    .send({inc_votes: "Lots of votes"})
    .expect(400)
  })
  test("Server responds with `400: Bad Request if the client has sent an invalid id`", () => {
    return request(app)
    .patch("/api/articles/article-id-number")
    .send({inc_votes: 100})
    .expect(400)
  })
  test("Server responds with `400: Bad Request` if the client has sent an invalid key", () => {
    return request(app)
    .patch("/api/articles/1")
    .send({wrong: 100})
    .expect(400)
  })
  test("Server responds with `404: Not Found` if the client has entered an article id that is valid but doesn't exist", () => {
    return request(app)
    .patch("/api/articles/10897")
    .send({inc_votes: 200})
    .expect(404)
  })

})

describe("GET /api/articles", () => {
  test ("The server should respond with a 200 status", () => {
    return request(app).get("/api/articles").expect(200)
})
  test ("If there is no query, the server should respond with an array of article objects with the properties `author`, `title`, `article_id`, `topic`, `created_at`, `votes`, `comment_count`", () => {

    return request(app).get("/api/articles")
    .then(({body}) => {
      const articles = body.articles
      expect(articles).toBeInstanceOf(Array);
      articles.forEach((element) => {
        expect(element).toEqual(
          expect.objectContaining({
            author:expect.any(String),
            votes: expect.any(Number),
            article_id: expect.any(Number),
            created_at: expect.any(String),
            body: expect.any(String),
            topic: expect.any(String),
            title: expect.any(String),
            comment_count: expect.any(String)
        })
      )})    
    })      
    })
    test("The array of objects should be sorted by the date of created, going from most recent to least recent", () => {
      return request(app).get("/api/articles")
      .then(({body}) => {
        const articles = body.articles
        expect(articles).toBeSortedBy("created_at", {descending: true})
      })
    })
    test.only("The endpoint /api/articles should accept the query `topic`, which filters the article by whichever topic the client chooses in the query.", () => {
      return request(app)
      .get("/api/articles/?topic=cats")
      .then(({body}) => {
       
        const articles = body.queryArray;
        articles.forEach((element) => {
          expect(element).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: "cats",
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          author: expect.any(String),
          comment_count: expect.any(String)

        })
        })
        
      })                                                                   

    })
    test.only("If the client enters a query id that isn't valid, the server should respond with `400: Bad Request", () => { return request(app)
        .get("/api/articles/?not-a-topic=alsonotatopic")
        .expect({400: "Bad Request"})

    })
    test("If the client enters a query id that is valid but doesn't exist, the server should respond with `404: Not Found`", () => {

    })

  })



   

