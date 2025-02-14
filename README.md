# mvie-app
-> Implemented: OMDB API for a Movie Search and Favorites app.
        Note: There's limit on the  API call.(1000/day)

    Setup done (frontend) -> 'npm create vite@latest . -- --template react-ts'
                                         -> installed npm
                                         -> installed axios, react-router-dom, sass

    Setup done (backend) -> npm init -y
                                        -> npm install express mongoose dotenv body-parser cors
                                        -> npm install --save-dev nodemon
                                        -> npm instal typescript @type/express ts-node
                                        -> npm i --save-dev@types/cors

-> Challenges faced: 
    1. Didn't have a clear plan on how to integrate frontend with backend at first.
    2. Needed to revise a lot of code for favourites page implementation.
    3. React with Sass was easy to implement but designing was complex for me.

-> How I overcame the challenges:
    1. Looked for the best folder structures in public Github repos.
    2. Researched about MERN stack and TS+ReactJS basics in freecodecamp tutorials.
    3. Used other tools to implement my ideas more clearly on the way of the development.
    4. Backend code was much simpler to implement for now because it only need one entity/collection for now.
    5. I took the challenges as an opportunity to learn.

This app:
Main objectives:
    1, Search for mocies using a public API
    2. View details about a selected movie.
    3. Add movies to a 'Favourites' List
    4. Persist the Favourites list in a database

When locally running this project:
You will need .env files:
 (.env) MONGO_URI(This I can provide) and PORT (I have used default 5000) //backend folder
(.env) VITE_BACKEND_URL(This one I set as localhost:5000) and VITE_OMDB_API_KEY(This I can provide)