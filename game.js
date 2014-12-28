var express = require('express');
var shuffle = require('shuffle');
var Player = require('./player.js');

var app = express();

app.get('/', function (req, res) {
	var deck = shuffle.shuffle();
	var players = [];
	var toReturn = [];
	var board  = new Player();
	board.name = 'Board';

	toReturn.push('initializing players');

	for(var i=0; i<10; i++) {
		var player = new Player();
		player.name ='Player ' + i;

		players.push(player);
	}

	//deal 2 cards to each player
	deck.deal(2, players);
	toReturn.push('hands dealed');
	
	//draw 5 cards to board
	board.cards = deck.draw(5);
	toReturn.push('board drawn');

	for(var i=0; i<10; i++)
		toReturn.push(players[i].getName() + ' ' + players[i].getCards());

	toReturn.push(board.getName() + ' ' + board.getCards());

	res.send(toReturn.join("<br>"));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});