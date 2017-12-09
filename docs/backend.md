# [![What's That Chord Doing?](img/logo.png)](http://what-s-that-chord-doing.herokuapp.com)

_What's That Chord Doing?_'s API is built on Node/Express

### Dependencies:

* Node
* Express
* MongoDB
* [Mongoose](http://mongoosejs.com), for schema/data-validation
* [Passport](http://passportjs.org/) / [Passport-JWT](https://github.com/themikenicholson/passport-jwt),
  for authentication
* [JWT-Simple](https://github.com/hokaccha/node-jwt-simple), 
  for encoding/decoding our authentication tokens
* [bcrypt.js](https://github.com/dcodeIO/bcrypt.js), 
  for password hashing before our data store
* [badwords](https://github.com/MauriceButler/badwords),
  for filtering user account names

Our backend is RESTful, [consists of seven CRUD endpoints](../api/README.md), 
and manages/serves account- and score-keeping-data for our app.

Authentication is with [JWT](https://jwt.io/introduction/), stored passwords 
are hashed using [bcrypt](https://en.wikipedia.org/wiki/Bcrypt).

We aggressively filter "profane" account names, because they're
globally-viewable, and... who knows?
