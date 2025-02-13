# mvie-app
-> Trying to implement: OMDB API(seems like 1000 limit per day) for a Movie Search and Favorites app.
    Setup done (frontend) -> 'npm create vite@latest . -- --template react-ts'
                                         -> installed npm
                                         -> installed axios, react-router-dom, sass

    Setup done (backend) -> npm init -y
                                        -> npm install express mongoose dotenv body-parser cors
                                        -> npm install --save-dev nodemon
                                        -> npm instal typescript @type/express ts-node
                                        -> npm i --save-dev@types/cors

-> Typescript implementation for code to be scalable
     -> Need make use of proper interfaces


     -> OMDB API calls using axios done for searching and displaying default movies (returns 10 movies per api call): if enough time we will make more than 1 api call to OMDB.

     -> How I think I can implement the favourites feature:
     1. Add to Favourites button will relay the imdbID
     2. Connect Backend
     3. Based on imdbID, we will access movie details from omdb api again
     4. Store the api call data into the database.
     5. Implement FavouritesList inside Favourites page.
     6. Add CRUD options in the favourites.
     
     7. Disable the Add to Favourites button on the basis of a new attribute which will check if the movie is in favourites already.