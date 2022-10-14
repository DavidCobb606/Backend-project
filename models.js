const { string } = require("pg-format");
const db = require("./db/connection");
const articles = require("./db/data/test-data/articles");


exports.fetchTopics = () => {
    const command = `
    SELECT *
    FROM topics;
    `;
    return db.query(command)
    .then(({rows: topics}) => {
        return topics
    })
    
}

exports.fetchArticleById = (id) => {
    
    const count = `
    SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.votes, articles.created_at, (COUNT(comments.article_id)) AS comment_count
    FROM articles
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `
     
    return db.query(count, [id])
    .then(({rows: articles}) => {
        
        if (articles.length ===0){
            return Promise.reject({
                status: 404,
                msg: "Not Found"
            })                 
        }
        else return articles       
        
    })
    
}

exports.fetchUsers = () => {
    const command = `
    SELECT *
    FROM users;
    `
    return db.query(command)
    .then(({rows: users}) => {
        return users
    })
}

exports.fetchAndModifyArticle = (id, votesValue) =>{
    const command = `
   UPDATE articles 
   SET votes = $2
   WHERE article_id = $1
   RETURNING *
    `

    return db.query(command, [id, votesValue])
    .then(({rows: articles}) => {
      
        if (articles.length ===0){
            return Promise.reject({
                status:404,
                msg: "Not Found"
            })
        }
        return articles[0]
    })
}

exports.fetchArticles = (topic) => {
    let queryValues = []
    let topics = ['cats', 'paper', 'mitch', 'coding', 'cooking', 'football']
  
    
 let command = `
    SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.votes, articles.created_at, COUNT(comments.article_id)::INT AS comment_count
    FROM articles
  
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
    `    
    
    if(topic){
        
        if (topics.includes(topic)){
            
            command += ` WHERE articles.topic = $1`

            queryValues.push(topic)
        }
      else{
        return Promise.reject({
            status: 404,
            msg: "Not Found"            
        })
      }  
    } 

    command += ` GROUP BY articles.article_id ORDER BY articles.created_at DESC`


    return db.query(command, queryValues)
    .then(({rows})=>{      
        
        return rows
    })


}

exports.postComment = (author, id, comment) => {

    let command = `INSERT INTO comments(body, author, article_id)
    VALUES($1, $2, $3)
    RETURNING *`
console.log("in models")

   
    
    return db.query(command, [comment, author, id ])
    .then(({rows: comments}) => {
       console.log(comments)
        if(comments.length ===0){
            return Promise.reject({
                status:404,
                msg: "Not Found"
            })
        }

        return comments
    })

}