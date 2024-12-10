const axios = require('axios');

const { apiToken } = require('../../../config/token');

module.exports = function(app, db) {
	app.post('/reviews', async (req, res) => {
		const review = {
			review: req.body.review,
			title: req.body.title, 
			movieId: Number(req.body.movieId),
			type: req.body.type,
		};

		try {
			const result = await db.collection('reviews').insertOne(review);
			res.send(result);
		} catch (error) {
			res.send({error});
		}
	});

	 // Обработчик GET-запроса для получения всех отзывов с заданным kpID
	 app.get('/reviews', async (req, res) => {
		const movieId = Number(req.query.movieId);
	
		if (!movieId) {
		  	return res.status(400).send({ error: 'Параметр MovieId обязателен' });
		}
	
		try {
			const localReviews = await db.collection('reviews').find({ movieId: movieId }).toArray();
			const kpReviews = await axios.get(`https://api.kinopoisk.dev/v1.4/review`, {
				params: {
				  movieId: movieId
				},
				headers: {
				  'Content-Type': 'application/json',
				  'X-API-KEY': apiToken,
				}
			  });

			res.status(200).json([...localReviews, ...kpReviews.data.docs]);
		} catch (error) {
		  	res.status(500).send({ error: `Ошибка при получении отзывов: ${error}` });
		}
	});
	
};
