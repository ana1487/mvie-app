# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


<!-- ##NOTES for tracking progress so far

FEB 11/ FEB 12: 
Made the frontend based on dummy data.
Understood the principles behind scss and ReactJS integration.
Understood basics of axios and react-router-dom
Undertood and made use of other react components as well as hooks.

IMPORTANT: 

FEB 13/14-> Targets
Implement remaining frontend tasks for which the notes are present below.
{/**
    NOTE: The favorites will have to be added into database to track favourites 
            Step 1: Make the OMDB API connection in Home.tsx file. 
            Step 2: MovieList will need to do OMDB api call to open Modal based on imdbID of movie.
            Step 3: Add to favourites button in MovieList.tsx file
            Steps 4: Based on the favourites button call from backend and render to Favourites.tsx page
            Steps 5: Make the delete button to remove the favourites from the list and update to the backend database
            Step 6: Decide which database and how to store the favourites and the tech stack.

            Challenge: I'm not familiar with MongoDB and Express setup. So, might need to rely on Laravel with postgres in the last minute
            -> Will need to learn MongoDB and Express in the next 2 days to implement the favourites feature properly
            -> Go back into the backend and implement the favourites feature using Laravel.
            */}

FEB 15: 
Target: DEPLOY into Vercel or HEROKU depending on the backend choice.
 -->