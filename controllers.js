
const {fetchTopics, fetchArticles, fetchUsers, fetchAndModifyArticle, fetchArticleById, postComment} = require("./models.js")

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

   return fetchArticles(topic)   
   .then((articles) => {   
  
       res.status(200).send({articles})
   })
    .catch(next)         
   
}

exports.getPostedComment = (req,res,next) => {
    console.log("in controller")
    const author = req.body.author
    const id = req.params.article_id
    const comment = req.body.body
    
    return postComment(author, id, comment)
    .then((comments) => {
       console.log(comments)
        res.status(200).send({comments})
    })
    .catch(next)
}

    
