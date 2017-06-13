const express = require('express');
const promise = require('bluebird');
const morgan = require('morgan');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');

const dbConfig = require('./db-config');
const db = pgp(dbConfig);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.get('/', function(request, response) {
  response.render('index.hbs');
});

// app.get('/search', function(request, response, next) {
//   var search = request.query.search;
//   var query = `SELECT * FROM restaurant WHERE restaurant.name ilike '%${search}%'`;
//   db.any(query)
//     then(function(resultsArray)){
//       response.render('search.hbs')
//       results: resultsArray
//     )};
//     console.log(resultsArray);
//   });
//   .catch(next);
// });

app.get('/reviews', function(request, response, next) {
  db.any('select * from restaurant_reviews')
    .then(function(reviews) {
      response.render('reviews.hbs', {
        reviews: reviews
      });
    })
    .catch(next);
});

// app.post('/query', function(request, response, next) {
//   var query = request.body.search;
//   response.redirect('/search?searchTerm=' + query);
// });
app.post('/submit', function(request, response, next) {
  var establishment = request.body.establishment;
  var name = request.body.name;
  var stars = request.body.stars;
  var review = request.body.review;
  db.any(`insert into restaurant_reviews values ('${establishment}','${name}',${stars},'${review}')`)
    .then(function() {
      response.redirect('/reviews');
    })
    .catch(next);
});

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
