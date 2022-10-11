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
    const command = `
    SELECT * FROM articles INNER JOIN comments on articles.article_id = comments.article_id WHERE articles.article_id = $1;
   `
    //
    // ALTER TABLE articles
    // ADD comment_count INTEGER;
    // 

//   db.query(`
//             UPDATE articles
//             SET comment_count = $1
//             RETURNING *
//              `, [articles.length])

    return db.query(command, [id])
    .then(({rows: articles}) => {
       console.log(articles)
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

