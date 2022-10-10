const {fetchTopics, fetchArticle, fetchUsers} = require("./models.js")

exports.getTopics = (req,res, next) =>{
    fetchTopics()
    .then((topics) => {        return res.status(200).send({topics})        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticle = (req,res, next) => {
    const {article_id} = req.params.article_id;
  
    fetchArticle(req.params.article_id)
    .then(({rows}) => {    
        return res.status(200).send({rows})
}) 
    .catch((err) => {
        next(err)
    })  
}

exports.getUsers = (req,res, next) => {
    fetchUsers()
    .then(({rows}) => {
       
        return res.status(200).send({rows})
    })
    .catch((err) => {
        next(err)
    })
    
}