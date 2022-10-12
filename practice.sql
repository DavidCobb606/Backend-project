\c nc_news_test

   

    SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.votes, articles.created_at, (COUNT(comments.article_id)) AS comment_count
    FROM articles    
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
       GROUP BY articles.article_id
       ORDER BY created_at DESC;
   WHERE articles.topic = "cats"

   
    