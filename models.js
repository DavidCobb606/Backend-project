const db = require("./db/connection");
const articles = require("./db/data/test-data/articles");
//const {axios} = require("axios")

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
   SET votes = votes + $2
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

exports.fetchArticles = (topic, sort_by = "created_at", orderBy = "desc") => {
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

    command += ` 
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${orderBy}    
    `


    return db.query(command, queryValues)
    .then(({rows})=>{   
        
        return rows
    })


}

exports.postComment = (author, id, comment) => {

    let command = `INSERT INTO comments(body, author, article_id)
    VALUES($1, $2, $3)
    RETURNING *`


   
    
    return db.query(command, [comment, author, id ])
    .then(({rows: comments}) => {
      

        return comments
    })

}
exports.fetchCommentsForArticle = (id) => {
    
    const idQuery = `
    SELECT article_id
    FROM articles
    WHERE article_id = $1
    `
    
    
    const command = 
    `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id
    FROM articles
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    ORDER BY created_at DESC;`

  
  return db.query(command, [id])
    .then(({rows: articles }) => {

        if (articles.length ===0){
            return Promise.reject({
                status:404,
                msg: "Not Found"
            })
        }

        return articles
    })   
    }

exports.fetchCommentById = (comment_id) => {

    const command = `
    SELECT *
    FROM comments
    WHERE comment_id= $1
    `
    return db.query(command, [comment_id])
    .then(({rows}) => {
       
        return rows

    })

}

exports.deleteComment = (comment_id) => {

    const command = `
        DELETE FROM comments
        WHERE comment_id=$1
        RETURNING *
    `
   
return db.query(command, [comment_id])
.then(({rows}) => {
    
    return rows
})

}

    
   
  

  
