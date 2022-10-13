
const {fetchTopics, fetchArticles, fetchUsers, fetchAndModifyArticle, fetchArticleById, getArticles} = require("./models.js")

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
    queryTopic = req.query.topic
    
  const lengthCheck = Object.keys(req.query).length
 
   fetchArticles(topic, lengthCheck, queryTopic)
    .then((articles) => {        
        if (articles !== undefined){
      return res.status(200).send({articles})
    } else if (articles === undefined){
        return reject
    }
    })
    .catch(next)         
  
}
     

    
