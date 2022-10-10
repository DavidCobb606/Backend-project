const {fetchTopics, fetchArticle} = require("./models.js")

exports.getTopics = (req,res, next) =>{
    fetchTopics()
    .then((topics) => {        return res.status(200).send({topics})        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticle = (req,res, next) => {
    const {article_id} = req.params;
    console.log(req.params)
    fetchArticle()
    .then((articles) => {
    console.log(articles)
 return res.status(200).send({msg: "all good"})
})
   
 

   
}