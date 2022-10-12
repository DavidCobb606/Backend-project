const db = require("./db/connection")

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

exports.fetchArticle = (id) => {
    
    const count = `
    SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.votes, articles.created_at, (COUNT(comments.article_id)) AS comment_count
    FROM articles
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`
    
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

exports.fetchArticles = () => {
    
    let command = `
    SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.votes, articles.created_at, (COUNT(comments.article_id)) AS comment_count
    FROM articles
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
       GROUP BY articles.article_id
       ORDER BY created_at DESC;
   
    `

//     Parameters are not supported in GROUP or ORDER BY clauses within PostgreSQL. This means that whenever user input is used in these statements it could be open to SQL injection. In these situations it is extremely important to sanitise and input before interpolating it into the statement.

// One easy way to prevent any malicious user input being added to the SQL statement is to use a "whitelist" strategy: check whether the variable matches one of a list of allowed values and reject the request if it doesn't.
    let queryValues = []

    if(req.query.topic !== undefined){
        command = `SELECT `
    }
    //unshift the query
    //shift the select
    
    return db.query(command)
    .then(({rows:articles}) => {        
    
        if (articles.length ===0){
        return Promise.reject({
            status:404,
            msg: "Not Found"
        })}
        
    return articles
    })
    
}
