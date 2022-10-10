const express = require("express");
const {getTopics, getArticle, getUsers} = require("./controllers.js")

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.get("/api/users", getUsers)

app.all("/*", (req,res) => {
    res.status(404).send({msg: "Route not found"})
})



app.use((err, req, res, next) => {
res.sendStatus(500)
  }
)

module.exports = app;