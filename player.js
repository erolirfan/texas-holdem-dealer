module.exports = function() {
    this.name = '';
    this.cards = [];
    this.allSeven = [];
    this.hand = null;

    this.getName = function() {
        return this.name;
    };

    this.push = function(card) {
        this.cards.push(card);
    };

    this.getCards = function() {
        var ret = [];
        for (var i = 0; i < this.cards.length; i++)
        // if (hideFirstCard && i === 0)
        //     ret.push('??');
        // else
            ret.push(this.cards[i].toShortDisplayString());
        return ret.join(',');
    };

    this.setHand = function(hand) {
        this.hand = hand;
    };
};
