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
    `

    return db.query(command)
    .then(({rows: articles}) => {
        return articles
    })
}