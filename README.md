# Kanban Gaming Board

[Live Version](https://kanbangb.herokuapp.com/)

A project management application for game development, based on kanban board. Made with [React](https://github.com/facebook/react) using [Create React App](https://github.com/facebook/create-react-app), [Node.JS](https://nodejs.org/en/), [React Redux](https://redux.js.org/), [Bootstrap 4](https://github.com/twbs/bootstrap/tree/v4-dev), [SASS](https://github.com/sass/sass), [Auth0](https://auth0.com/) and [Firebase/Firestore](https://firebase.google.com/?hl=pt-br).

## Core Features

- User authentication with social providers (Google and Facebook)
- Automatic account linking (social providers with the same email are linked)
- User data persistence in a firestore cloud database
- Create, delete and edit projects
- Create and delete boards
- Create and delete tasks
- Drag and drop tasks
- Invite other users to project

## Running the project

Clone the project:
```
cd project/save/path
git clone https://github.com/pvnetto/Hacker-News-React.git
cd Hackers-News-React
```


Create a .env file in the root folder and in react-ui/. Use the .env.example file as a reference to variable names and where the values can be obtained.

After creating and populating the .env files with the proper variables, use npm to install the dependencies and start the development environment.

```
npm install
cd ./react-ui/
npm install
cd ../
npm run dev
```

## Workflow
This project was deployed to heroku using the [create-react-app + node buildpack](https://github.com/mars/heroku-cra-node), so it includes projects in one: A Node server and a React client.

The Node server files are on the root folder and the React client files are on the react-ui/ folder, therefore this application has a package.json file for each project, and consequently there are some workflow caveats.

* Dependencies must be installed separately.
* Development environment must be started from the root folder (server), using either npm run dev or npm start
* There should always be two .env files, one on the root folder and the other on react-ui/
  * They should have the same values
  * This is a limitation of the Node + CRA workflow, that doesn't allow server variables to be accessed by the clients, and changing this would require ejecting and modifying some webpack configuration.
  
  
## Roadmap

* [ ] Testing
* [ ] Sign In/Sign Up with custom provider
* [ ] Assign tasks to project contributors
* [ ] Edit tasks
