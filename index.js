const express = require("express");
const {returnDeletedStatus, getTopics, getArticles,getUsers, getModifiedArticle, getCommentsForArticle, getArticleById, getPostedComment, getCommentById, getProductList} = require("./controllers.js")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsForArticle);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", getModifiedArticle);

app.post("/api/articles/:article_id/comments", getPostedComment);

app.get("/api/comments/:comment_id", getCommentById)

app.delete("/api/comments/:comment_id", returnDeletedStatus);

app.get("/api/productlist", getProductList)

app.all("/*", (req,res) => {
  
    res.status(404).send({msg: "Route not found"})
})

app.use((err,req,res,next) => {

if(err.code === "23503"){
  res.status(404).send({msg: "Not Found"})
}
else next(err)

})

app.use((err, req,res,next) => {
 
  if(err.code === "22P02" || err.code === "23502" || err.status === 400){
    res.status(400).send({msg: "Bad Request"})}
    else next(err)
  })

app.use((err, req,res,next) => {

if(err.status = 404){
  res.status(404).send({msg: "Not Found"})
}
else next(err)
})

app.use(( err,req,res,next) => {


  if(err.status){
    res.status(err.status).send({msg: err.msg})
  }
})

app.use((err,req,res,next) => {
  res.status(500).send({msg: "Internal server error"})
})

module.exports = app;