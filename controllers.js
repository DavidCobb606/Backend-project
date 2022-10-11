const {fetchTopics, fetchArticle, fetchUsers} = require("./models.js")

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
    .then(({rows}) => {  
       if(rows.length ===0){
        return Promise.reject({
            status: 404,
            msg: "Not Found"
        })
       }else{
            return res.status(200).send({rows})
       }
}) 
    .catch(next)
     
}
exports.getUsers = (req,res, next) => {
    fetchUsers()
    .then((users) => {
       console.log(users)
        return res.status(200).send({users})
    })
    .catch((err) => {
        next(err)
    })}
    