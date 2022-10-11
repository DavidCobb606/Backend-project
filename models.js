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
    SELECT *
    FROM articles    
    WHERE article_id = $1
    `
  
    return db.query(command, [id])

}

exports.fetchAndModifyArticle = (id) =>{
    const command = `
    UPDATE votes
    FROM articles
    SET votes = 150
    WHERE article_id = $1

    `

    return db.query(command, [id])
}

