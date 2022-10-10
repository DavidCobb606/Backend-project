#Readme

Since .env is ignored by git, anyone using this repo will not have access to these variables. You will therefore need to add two files:
(1) .env.development, which connects to the database "nc_news"
(2) .env.test, which connects to the database "nc_news_test"

To use these successfully, you will need to install the npm package "dotenv", which you can do by running 

```npm install dotenv```

