\c nc_news_test;

SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body
    FROM articles
    LEFT JOIN comments
        ON articles.article_id = comments.article_id
    WHERE articles.article_id = 1
    ORDER BY created_at DESC;