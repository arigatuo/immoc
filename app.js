var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require("body-parser")
var Movie = require("./models/movie");
var _ = require("underscore");

mongoose.connect('mongodb://localhost/immoc')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port);

console.log('immoc started on port ' + port);

//index page
//
app.get('/', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title : "index title",
			movies: movies
		});
	})
});

app.get('/movie/:id', function(req, res){
	var id = req.params.id
	Movie.findById(id, function (err, movie){
		res.render('detail', {
			title : "detail title",
			movie: movie
		});
	});
});

app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if(id){
		Movie.findById(id, function(err, movie){
			console.log(movie);
			res.render('admin',{
				title : 'update movie' + id,
				movie : movie
			})
		});
	}
});


app.post('/admin/movie/new', function(req, res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
console.log(id);

	if(typeof id != 'undefined' && id != "undefined"){
		console.log('here');
		console.log(typeof id);
		console.log(id);
		console.log(typeof id != 'undefined');
		Movie.findById(id,  function (err, movie){
			if(err){
				console.log(err)
			}
			console.log(movie);

			_movie = _.extend(movie, movieObj)
			console.log(_movie);
			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/'+movie._id)
			})
		});
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title : movieObj.title,
			country : movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		});
		_movie.save(function(err, movie){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/'+movie._id)
		})
	}
});

app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title : "admin title",
		movie: {
			doctor : '',
			title : '',
			country : '',
			language: '',
			year : '',
			poster: '',
			summary : '',
			flash : '',
		}
	});
});

app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list', {
			title : "list title",
			movies: movies
		});
	})
});


app.delete('/admin/list', function(req, res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id:id}, function(err, movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		});
	}
});









