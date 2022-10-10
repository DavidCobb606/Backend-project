const {fetchTopics} = require("./models.js")

exports.getTopics = (req,res, next) =>{
    fetchTopics()
    .then((topics) => {

        console.log(topics)
        return res.status(200).send({topics})        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticle = (req,res, next) => {
    const {article_id} = req.params;
    console.log("In getArticle")

    return res.status(200).send({msg: "all good"})
}