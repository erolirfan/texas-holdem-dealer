module.exports = function() {
    this.result = '';
    this.orders = [];
    this.resultRank = -1;
    this.isWinner = false;
    this.winnerCards = [];

    this.getCardsSorted = function(cards) {
        this.sortCards(cards[0]);
    };

    this.calculateScore = function(cards) {
        this.result = '';
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        if (this.result === '')
            this.isRoyalFlush(cards[0]);
        if (this.result === '')
            this.isStraightFlush(cards[0]);
        if (this.result === '')
            this.isFourOfAKind(cards[0]);
        if (this.result === '')
            this.isFullHouse(cards[0]);
        if (this.result === '')
            this.isStraight(cards[0]);
        if (this.result === '')
            this.isFlush(cards[0]);
        if (this.result === '')
            this.isThreeOfAKind(cards[0]);
        if (this.result === '')
            this.isTwoPairs(cards[0]);
        if (this.result === '')
            this.isOnePair(cards[0]);
        if (this.result === '')
            this.isHighCard(cards[0]);

        this.debugResult();

        return this;
    };

    this.isRoyalFlush = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 3; i++) {
            if (curHand[i].sort == 14) {
                if ((curHand[i].suit == curHand[i + 1].suit && curHand[i + 1].sort == 13) &&
                    (curHand[i].suit == curHand[i + 2].suit && curHand[i + 2].sort == 12) &&
                    (curHand[i].suit == curHand[i + 3].suit && curHand[i + 3].sort == 11) &&
                    (curHand[i].suit == curHand[i + 4].suit && curHand[i + 4].sort == 10)) {

                    this.result = 'ROYAL_FLUSH';
                    this.orders.push(curHand[i].sort);
                    this.resultRank = 10;

                    this.winnerCards.push(curHand[i]);
                    this.winnerCards.push(curHand[i + 1]);
                    this.winnerCards.push(curHand[i + 2]);
                    this.winnerCards.push(curHand[i + 3]);
                    this.winnerCards.push(curHand[i + 4]);

                    return;
                }
            }
        }
    };

    this.isStraightFlush = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 3; i++) {
            if ((curHand[i].suit == curHand[i + 1].suit && curHand[i + 1].sort == curHand[i].sort - 1) &&
                (curHand[i].suit == curHand[i + 2].suit && curHand[i + 2].sort == curHand[i].sort - 2) &&
                (curHand[i].suit == curHand[i + 3].suit && curHand[i + 3].sort == curHand[i].sort - 3) &&
                (curHand[i].suit == curHand[i + 4].suit && curHand[i + 4].sort == curHand[i].sort - 4)) {

                this.result = 'STRAIGHT_FLUSH';

                this.orders.push(curHand[i].sort);

                this.resultRank = 9;

                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);
                this.winnerCards.push(curHand[i + 2]);
                this.winnerCards.push(curHand[i + 3]);
                this.winnerCards.push(curHand[i + 4]);

                return;
            }
        }
    };

    this.isFourOfAKind = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 4; i++) {
            if ((curHand[i + 1].sort == curHand[i].sort) &&
                (curHand[i + 2].sort == curHand[i].sort) &&
                (curHand[i + 3].sort == curHand[i].sort)) {

                this.result = '4_OF_A_KIND';
                this.orders.push(curHand[i].sort);

                this.resultRank = 8;
                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);
                this.winnerCards.push(curHand[i + 2]);
                this.winnerCards.push(curHand[i + 3]);

                if (i === 0) {
                    this.winnerCards.push(curHand[4]);
                } else if (i > 0) {
                    this.winnerCards.push(curHand[0]);
                }

                return;
            }
        }
    };

    this.isFullHouse = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 5; i++) {
            var holdTmp = -1;
            if ((curHand[i + 1].sort == curHand[i].sort) &&
                (curHand[i + 2].sort == curHand[i].sort)) {

                this.orders.push(curHand[i].sort);
                holdTmp = curHand[i].sort;

                for (var j = 0; j < 6; j++) {
                    if (holdTmp !== curHand[j].sort &&
                        curHand[j + 1].sort == curHand[j].sort) {

                        this.result = 'FULL_HOUSE';
                        this.orders.push(curHand[j].sort);

                        this.resultRank = 7;
                        this.winnerCards.push(curHand[i]);
                        this.winnerCards.push(curHand[i + 1]);
                        this.winnerCards.push(curHand[i + 2]);
                        this.winnerCards.push(curHand[j]);
                        this.winnerCards.push(curHand[j + 1]);

                        return;
                    }
                }
            }
        }
    };

    this.isFlush = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 3; i++) {
            if ((curHand[i + 1].suit == curHand[i].suit) &&
                (curHand[i + 2].suit == curHand[i].suit) &&
                (curHand[i + 3].suit == curHand[i].suit) &&
                (curHand[i + 4].suit == curHand[i].suit)) {

                this.result = 'FLUSH';
                this.orders.push(curHand[i].sort);

                this.resultRank = 6;
                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);
                this.winnerCards.push(curHand[i + 2]);
                this.winnerCards.push(curHand[i + 3]);
                this.winnerCards.push(curHand[i + 4]);

                return;
            }
        }
    };

    this.isStraight = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 3; i++) {
            if ((curHand[i + 1].sort == curHand[i].sort - 1) &&
                (curHand[i + 2].sort == curHand[i].sort - 2) &&
                (curHand[i + 3].sort == curHand[i].sort - 3) &&
                (curHand[i + 4].sort == curHand[i].sort - 4)) {
                this.result = 'STRAIGHT';
                this.orders.push(curHand[i].sort);

                this.resultRank = 5;
                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);
                this.winnerCards.push(curHand[i + 2]);
                this.winnerCards.push(curHand[i + 3]);
                this.winnerCards.push(curHand[i + 4]);

                return;
            }
        }
    };

    this.isThreeOfAKind = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 5; i++) {
            if ((curHand[i + 1].sort == curHand[i].sort) &&
                (curHand[i + 2].sort == curHand[i].sort)) {

                this.result = '3_OF_A_KIND';
                this.orders.push(curHand[i].sort);

                this.resultRank = 4;
                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);
                this.winnerCards.push(curHand[i + 2]);

                if (i === 0) {
                    this.winnerCards.push(curHand[3]);
                    this.winnerCards.push(curHand[4]);
                } else if (i == 1) {
                    this.winnerCards.push(curHand[0]);
                    this.winnerCards.push(curHand[4]);
                } else if (i > 1) {
                    this.winnerCards.push(curHand[0]);
                    this.winnerCards.push(curHand[1]);
                }

                return;
            }
        }
    };

    this.isTwoPairs = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 6; i++) {
            var holdTmp = -1;
            var holdTmp2 = -1;
            if ((curHand[i + 1].sort == curHand[i].sort)) {

                this.orders.push(curHand[i].sort);
                holdTmp = curHand[i].sort;
                for (var j = 0; j < 6; j++) {
                    if (holdTmp !== curHand[j].sort &&
                        curHand[j + 1].sort == curHand[j].sort) {

                        holdTmp2 = curHand[j].sort;
                        this.orders.push(curHand[j].sort);

                        for (var k = 0; k < 7; k++) {
                            if (curHand[k].sort != holdTmp &&
                                curHand[k].sort != holdTmp2) {
                                this.result = "TWO_PAIRS";
                                this.resultRank = 3;

                                this.winnerCards.push(curHand[i]);
                                this.winnerCards.push(curHand[i + 1]);
                                this.winnerCards.push(curHand[j]);
                                this.winnerCards.push(curHand[j + 1]);
                                this.winnerCards.push(curHand[k]);

                                return;
                            }
                        }
                    }
                }
            }
        }
    };

    this.isOnePair = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var i = 0; i < 6; i++) {
            var holdTmp = -1;

            if ((curHand[i + 1].sort == curHand[i].sort)) {
                this.orders.push(curHand[i].sort);
                holdTmp = curHand[i].sort;

                this.winnerCards.push(curHand[i]);
                this.winnerCards.push(curHand[i + 1]);

                for (var k = 0; k < 7; k++) {
                    if (curHand[k].sort != holdTmp) {
                        this.winnerCards.push(curHand[k]);

                        if (this.winnerCards.length == 5) {
                            this.result = "ONE_PAIR";
                            this.resultRank = 2;

                            return;
                        }
                    }
                }
            }
        }
    };

    this.isHighCard = function(curHand) {
        this.orders = [];
        this.winnerCards = [];
        this.resultRank = -1;

        for (var k = 0; k < 7; k++) {
            this.winnerCards.push(curHand[k]);
            this.orders.push(curHand[k].sort);

            if (this.winnerCards.length == 5) {
                this.result = "HIGH_CARD";
                this.resultRank = 1;
                return;
            }
        }
    };

    //sort input cards descending
    this.sortCards = function(data) {
        return data.sort(function(a, b) {
            var keyA = a.sort,
                keyB = b.sort;

            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
    };

    this.debugResult = function() {
        console.log("Result " + this.result +
            " ResultCode: " + this.resultRank +
            " WinnerCards: " + JSON.stringify(this.winnerCards));
    };
};
