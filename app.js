const express = require("express");
<<<<<<< HEAD
const {getTopics} = require("./controllers.js")
=======
const {getTopics, getArticle} = require("./controllers.js")
>>>>>>> 63501e06b9c903c732a80e4da71226ce15262cc9

const app = express();

app.get("/api/topics", getTopics);

<<<<<<< HEAD
app.get("/api/articles/:article_id")
=======
app.get("/api/articles/:article_id", getArticle)
>>>>>>> 63501e06b9c903c732a80e4da71226ce15262cc9

app.all("/*", (req,res) => {
    res.status(404).send({msg: "Route not found"})
})

app.use((err, req, res, next) => {

<<<<<<< HEAD
    res.sendStatus(500)
    
=======
<<<<<<<< HEAD:api.js

========
    res.sendStatus(500)
    
>>>>>>>> 63501e06b9c903c732a80e4da71226ce15262cc9:app.js
>>>>>>> 63501e06b9c903c732a80e4da71226ce15262cc9
}
)

module.exports = app;