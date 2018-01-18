require("dotenv").config(); //imports variables from .env

//loads dependencies - local API keys
var keys = require("./keys.js");

//Creates command-line arguments
var command = process.argv[2];
var argument =process.argv[3];

//function to run the command
switch (command) {
	case "my-tweets":
	twitterAPI();
	break;

	case "spotify-this-song":
	spotifyAPI();
	break;

	case "movie-this":
	movieAPI();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;

}

//runs Twitter API and generates 20 recent tweets
function twitterAPI (){
	var Twitter = require("twitter");

	var client = new Twitter(keys.twitter);

	var params = {
		screen_name: 'olivegrit_dev', 
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				console.log("----------------");
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
			}

		} else {
			return console.log(error);
		}
	});
}

//runs Spotify API and searches for song entered in node; if no song, then it shows details for "The Sign" by Ace of Base
function spotifyAPI(){
	var Spotify = require("node-spotify-api");

	var spotify = new Spotify(keys.spotify);

	if (argument){
		spotify.search({ 
			type: 'track', 
			query: argument 
		}, function(error, data) {
  			if (!error) {
  				console.log("----------------");
  				console.log("Artist Name: " + data.tracks.artists.name); 
  				console.log("Song Name: " + data.tracks.name);
  				console.log("Album Name: " + data.tracks.album.name);
  				console.log("Song Preview Link :" + data.body.tracks.external_urls);
    		}
    	});	
	}
    else {
    	spotify.search({ 
			type: 'track', 
			query: 'The Sign' 
		}, function(error, data) {
  			if (!error) {
  				console.log("----------------");
  				console.log("Artist Name: " + data.tracks.artists.name); 
  				console.log("Song Name: " + data.tracks.name);
  				console.log("Album Name: " + data.tracks.album.name);
  				console.log("Song Preview Link :" + data.body.tracks.external_urls);
    		}
    	});		
    }	
}

//runs the OMDB API and if no movie is entered in the command line then it will default to "Mr. Nobody"
function movieAPI(){
	var request = require('request');
	
	request('http://www.omdbapi.com/?apikey=trilogy&', function (error, response, body) {
		if (argument) {
    		console.log("------------------");
    		console.log("Movie Title: " + body.Title);
    		console.log("Year: " + JSON.parse(body).Year);
    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    		// console.log("Rotten Tomatoes: " + JSON.parse(body).rating.source);
    		console.log("Country: " + JSON.parse(body).Country);
    		console.log("Language: " + JSON.parse(body).Language);
    		console.log("Plot: " + JSON.parse(body).Plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
    	} else {
    		request('http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy&', function (error, response, body) {
				if (argument) {
					console.log("------------------");
					console.log("Movie Title: " + JSON.parse(body).Title);
					console.log("Year: " + JSON.parse(body).Year);
					console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
					// console.log("Rotten Tomatoes: " + JSON.parse(body).rating.source);
					console.log("Country: " + JSON.parse(body).Country);
					console.log("Language: " + JSON.parse(body).Language);
					console.log("Plot: " + JSON.parse(body).Plot);
					console.log("Actors: " + JSON.parse(body).Actors);
				}		
			});		
    	}
	});
}

//reads the random.txt file then should run the command inside, which is the spotify API calling the song "I Want It That Way"
function doWhatItSays(){

	var fs = require("fs");

	fs.readFile("./../random.txt", "utf8", function(error, data) {

	if (error) {
    	return console.log(error);
  	}
  	console.log(data);
  	spotifyAPI();

	});
}