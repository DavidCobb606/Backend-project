
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
    
  const lengthCheck = Object.keys(req.query).length
 

  if(lengthCheck === 0 || (lengthCheck === 1 && req.query.topic !== undefined)){
   
    fetchArticles(topic)
    .then((articles) => {
        

      return res.status(200).send({articles})
    })
    .catch(next)         
} else {
 
    return res.status(400).send({msg: "Bad Request"})
}
    
    
}
     

    
