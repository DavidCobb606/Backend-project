
const {fetchTopics, fetchArticle, fetchUsers, fetchAndModifyArticle} = require("./models.js")

exports.getTopics = (req,res, next) =>{
    fetchTopics()
    .then((topics) => {        
        return res.status(200).send({topics})        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticle = (req,res, next) => {
  
    fetchArticle(req.params.article_id)
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
     

    
