const reviewRoutes = require('./review_routes');
const movieRsotues = require('./movies_routes');
const movies_routes = require('./movies_routes');

module.exports = function(app, db) {
  reviewRoutes(app, db);
  movies_routes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};