const _getCardValue = (name) => {
  if (isNaN(name)) {
    return 10;
  }

  return Number(name);
};

const _decodeDeck = (data) => {
  return {
    deckId: data.deck_id,
  }
};

const _decodeCard = (data) => {
  return {
    images: data.images,
    name: data.value,
    value: _getCardValue(data.value),
    suit: data.suit,
    code: data.code
  };
};

export default {
  /** 
   * Creates a shuffled deck of cards
   * GET or POST
   * In: count of decks to play with
   * Out: deck id
  */
  async shuffleCards(deckCount = 1) {
    return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(deck => {
      return _decodeDeck(deck);
    }).catch(err => {
      console.log(err);
      throw err;
    });
  },

  /** 
   * Draws a card
   * GET
   * In: count of cards to draw
   * Out: list of cards & deck id
  */
  async drawCard(deckId = 'new', count = 1) {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(json => {
      return json.cards.map(_decodeCard);
    }).catch(err => {
      console.log(err);
      throw err;
    });

  },
}