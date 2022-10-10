const express = require("express");
const {getTopics, getArticle} = require("./controllers.js")

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.all("/*", (req,res) => {
    res.status(404).send({msg: "Route not found"})
})

app.use((err, req, res, next) => {


}
)

module.exports = app;