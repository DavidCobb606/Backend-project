# Readme

## About

This project is the back-end component of a larger project called "NC News" that creates a very basic version of a forum where users write articles within certain topics, and other users can comment on said articles. This is not supposed to be a project that actually has practical working-value, but instead to be a means to showcase skills that I have learnt through my time at Northcoders bootcamp.

The front-end counterpart is available here:

https://github.com/DavidCobb606/nc-news

A minimum version of node needed to run this is v18

## Connecting to the Database

Since .env is ignored by git, anyone using this repo will not have access to these variables. You will therefore need to add two files:

(1) .env.development, which connects to the database "nc_news" in the following format:

PG_DATABASE=nc_news

(2) .env.test, which connects to the database "nc_news_test" in the following format:

PG_DATABASE=nc_news_test

To use these successfully, you will need to install the npm package "dotenv", which you can do by running 

```npm install dotenv```

Next, make sure you have PostgreSQL installed:

```npm i pg```

Then run:

```psql -f ./db/setup.sql ```

This will connect you to the database. 

## Tests

To run the tests, you must have (1) jest, (2) jest supertest, and (3) jest-sorted installed into your dependencies. The installation code for this is:

(1) ```npm i jest ```

(2) ```npm i supertest```

(3) ```npm i jest-sorted ```





