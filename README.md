# ![What's That Chord Doing?](docs/img/logo.png)

[What's That Chord Doing?](https://what-s-that-chord-doing.herokuapp.com/) is an ear-training app for intermediate musicians&#8212;roughly sophomore-level musicianship students, in college.

Project directory structure and build system derived from the [Thinkful React starter kit](https://github.com/oampo/thinkful-react-starter).

### Working on OR trying the project:
  1. [Make sure you have MongoDB](#install-mongodb)
  2. Clone this repo
  3. `npm i` or `yarn install`
  4. `mongod&` to open the mongo daemon
  5. `npm run dev` or `yard dev` to start the server, build our app, and update whenever we make changes&#8212;OR `npm start` to just start our server.
    * Serves our client at http://localhost:8080 (try it out in your browser)
    * Services our API endpoints

----------------------------------------------------------

### Install MongoDB

* Homebrew: `brew install mongodb`
* Debian/Ubuntu: `apt-get install mongodb` 

----------------------------------------------------------

### Rationale

Hearing chords in the context of a key is a crucial musical skill. Most ear training apps ignore this and instead have us identify chords outside a context—by "character," instead of function.

### Description

This is an app for musical intermediates that want to start transcribing or get better at playing by ear.

### API documentation

[See the API README](api/README.md)

### Tech used

_What's That Chord Doing_ is a full-stack JS app, built on Node/Express, with React/Redux, and MongoDB as the data store.

* [Frontend](docs/frontend.md)

* [Backend](docs/backend.md)

* [Testing](docs/testing.md)

_-DR, 2017_



