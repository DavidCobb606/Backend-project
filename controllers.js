
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
    console.log(req.params)
    
    fetchAndModifyArticle(id, votesValue).
    then((articles) => {
        
       return res.status(200).send({articles})        
    })
    .catch(next)
}

exports.getArticles =  (req,res,next) => {
   
    const topic = req.query.topic

   
    fetchArticles(topic)
    .then((articles) => {
        
        if(topic !== undefined){
          const queryArray = articles.filter((element) => {
                return element.topic === "cats"
            })
            
            return res.status(200).send({queryArray})
        }
       
        return res.status(200).send({articles})

    })
}
     

    
