
const {fetchTopics, fetchArticleById, fetchUsers, fetchAndModifyArticle, fetchCommentsForArticle, fetchArticles, postComment} = require("./models.js")


exports.getTopics = (req,res, next) =>{
    fetchTopics()
    .then((topics) => {        
        return res.status(200).send({topics})        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticleById = (req,res, next) => {
  
    fetchArticleById(req.params.article_id)
    .then((articles) => {  
            
          return res.status(200).send({articles})  
        }) 
    .catch(next)  
}
exports.getUsers = (req,res, next) => {
    fetchUsers()
    .then((users) => {
       
        return res.status(200).send({users})
    })
    .catch((err) => {
        next(err)
    })}

exports.getModifiedArticle = (req,res,next) =>{
    const id = req.params.article_id;
    const votesValue = req.body.inc_votes 
  
    
    fetchAndModifyArticle(id, votesValue).
    then((articles) => {
        
       return res.status(200).send({articles})        
    })
    .catch(next)
}

exports.getArticles =  (req,res,next) => {
   
    const {topic} = req.query 
    const {sort_by} = req.query
    const {orderBy} = req.query
    const {comment_count} = req.query
    console.log(sort_by)

   return fetchArticles(topic, sort_by, orderBy, comment_count)   
   .then((articles) => {   
  
       res.status(200).send({articles})
   })
    .catch(next)         
   
}

exports.getPostedComment = (req,res,next) => {
   
    const author = req.body.author
    const id = req.params.article_id
    const comment = req.body.body
    
    return postComment(author, id, comment)
    .then((comments) => {
     
        res.status(200).send({comments})
    })
    .catch(next)
}
     
exports.getCommentsForArticle = (req,res,next) => {
    const id = req.params.article_id;
   

    fetchCommentsForArticle(id)
    .then((articles) => {
               
        return res.status(200).send({articles})
    })
    .catch((err) => {
        
        next(err)
    })
}
    
