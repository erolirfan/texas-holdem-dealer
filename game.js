var express = require('express');
var shuffle = require('shuffle');
var Player = require('./player.js');
var Hand = require('./hand.js');

var app = express();

app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    var deck = shuffle.shuffle();
    var players = [];
    var toReturn = [];
    var board = new Player();
    var hand = new Hand();
    var winnerPlayers = [];
    var winnerRank = -1;

    board.name = 'Board';

    toReturn.push('initializing players');

    for (var i = 0; i < 10; i++) {
        var player = new Player();
        player.name = 'Player ' + i;

        players.push(player);
    }

    //deal 2 cards to each player
    deck.deal(2, players);
    toReturn.push('hands dealed');

    //draw 5 cards to board
    board.cards = deck.draw(5);
    toReturn.push('board drawn');

    for (var i = 0; i < 10; i++)
        toReturn.push(players[i].getName() + ' ' + players[i].getCards());

    for (var i = 0; i < 10; i++) {
        hand = new Hand();

        players[i].allSeven.push(board.cards.concat(players[i].cards));

        hand.getCardsSorted(players[i].allSeven);

        hand.calculateScore(players[i].allSeven);

        players[i].setHand(hand);
    }

    toReturn.push(board.getName() + ' ' + board.getCards());

    //determine orders and resultRank
    for (var i = 0; i < 10; i++)
        if (players[i].hand.resultRank > winnerRank) {
            winnerRank = players[i].hand.resultRank;
        }

        //push to winner pot based on resultRank
    for (var i = 0; i < 10; i++) {
        if (players[i].hand.resultRank == winnerRank)
            winnerPlayers.push(players[i]);
    }

    //eliminate from winner pot based on winner card rankings
    for (var i = 0; i < winnerPlayers.length - 1; i++) {
        console.log(winnerPlayers.length);

        if (winnerPlayers.length == 1)
            break;

        if (winnerPlayers[i].hand.winnerCards[0].sort < winnerPlayers[i + 1].hand.winnerCards[0].sort)
            winnerPlayers.splice(i, 1);
        else if (winnerPlayers[i].hand.winnerCards[0].sort > winnerPlayers[i + 1].hand.winnerCards[0].sort)
            winnerPlayers.splice(i + 1, 1);

        if (winnerPlayers.length == 1)
            break;

        if (winnerPlayers[i].hand.winnerCards[1].sort < winnerPlayers[i + 1].hand.winnerCards[1].sort)
            winnerPlayers.splice(i, 1);
        else if (winnerPlayers[i].hand.winnerCards[1].sort > winnerPlayers[i + 1].hand.winnerCards[1].sort)
            winnerPlayers.splice(i + 1, 1);

        if (winnerPlayers.length == 1)
            break;

        if (winnerPlayers[i].hand.winnerCards[2].sort < winnerPlayers[i + 1].hand.winnerCards[2].sort)
            winnerPlayers.splice(i, 1);
        else if (winnerPlayers[i].hand.winnerCards[2].sort > winnerPlayers[i + 1].hand.winnerCards[2].sort)
            winnerPlayers.splice(i + 1, 1);

        if (winnerPlayers.length == 1)
            break;

        if (winnerPlayers[i].hand.winnerCards[3].sort < winnerPlayers[i + 1].hand.winnerCards[3].sort)
            winnerPlayers.splice(i, 1);
        else if (winnerPlayers[i].hand.winnerCards[3].sort > winnerPlayers[i + 1].hand.winnerCards[3].sort)
            winnerPlayers.splice(i + 1, 1);

        if (winnerPlayers.length == 1)
            break;

        if (winnerPlayers[i].hand.winnerCards[4].sort < winnerPlayers[i + 1].hand.winnerCards[4].sort)
            winnerPlayers.splice(i, 1);
        else if (winnerPlayers[i].hand.winnerCards[4].sort > winnerPlayers[i + 1].hand.winnerCards[4].sort)
            winnerPlayers.splice(i + 1, 1);

        console.log(winnerPlayers.length);
    }

    for (var i = 0; i < winnerPlayers.length; i++) {
        var winnerCardsStr = [];

        for (var j = 0; j < winnerPlayers[i].hand.winnerCards.length; j++)
        //winnerCardsStr.push(winnerPlayers[i].hand.winnerCards[j].sort);
        {
            if (winnerPlayers[i].hand.winnerCards[j].sort > 10)
                winnerCardsStr.push("<img src='public/cards/" + winnerPlayers[i].hand.winnerCards[j].description + "_of_" + winnerPlayers[i].hand.winnerCards[j].suit + "s.png' width='70px'/>");
            else
                winnerCardsStr.push("<img src='public/cards/" + winnerPlayers[i].hand.winnerCards[j].sort + "_of_" + winnerPlayers[i].hand.winnerCards[j].suit + "s.png' width='70px'/>");
        }

        toReturn.push("Winner Player: " + winnerPlayers[i].getName() +
            " Rank: " + winnerPlayers[i].hand.result +
            " Orders: " + winnerPlayers[i].hand.orders +
            " Hand: " + winnerCardsStr);
    }


    toReturn.push("<br>");
    res.send(toReturn.join("<br>"));
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
