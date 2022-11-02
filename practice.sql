\c nc_news_test
    
UPDATE articles 
   SET votes = votes + 95
   WHERE article_id = 4
   RETURNING *


    
