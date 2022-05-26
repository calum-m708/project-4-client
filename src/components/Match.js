import React from 'react';
import { useLocation } from 'react-router-dom';
import { credentials, getCollection, updateCollection } from '../api/auth';
import { getAllCards } from '../api/card';
import { Link } from 'react-router-dom';

const Match = () => {
  // const location = useLocation();
  // const [activePlayer, setActivePlayer] = React.useState(true);
  const [playerDeck, setPlayerDeck] = React.useState(null);
  const [wonCards, setWonCards] = React.useState([]);
  const [graveyard, setGraveyard] = React.useState([]);
  const [playerActiveCard, setPlayerActiveCard] = React.useState(null);
  const [aiActiveCard, setAiActiveCard] = React.useState(null);
  const [aiDeck, setAiDeck] = React.useState(null);
  const [simpleCollection, setSimpleCollection] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    const token = sessionStorage.getItem('token');
    const getData = async () => {
      try {
        const data = await credentials(token);
        const collection = data.collection;
        const allCards = await getAllCards();
        const simpleCollectionArray = await getCollection(
          sessionStorage.getItem('userid')
        );
        setSimpleCollection(simpleCollectionArray.collection);
        populateDeck(collection).then((tempCollection) => {
          if (isMounted) setPlayerDeck(tempCollection);
        });
        populateDeck(allCards).then((tempCollection) => {
          if (isMounted) setAiDeck(tempCollection);
        });
        console.log('load');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, []);
  React.useEffect(() => {
    if (playerDeck) {
      setPlayerActiveCard(
        playerDeck[Math.floor(Math.random() * playerDeck?.length)]
      );
      console.log('won cards', wonCards);
      if (playerDeck.length < 1) {
        endgame();
      }
    }
  }, [playerDeck]);

  React.useEffect(() => {
    if (aiDeck) {
      setAiActiveCard(aiDeck[Math.floor(Math.random() * aiDeck?.length)]);
      // console.log('ai active card', aiActiveCard);
      console.log('graveyard', graveyard);
    }
  }, [aiDeck]);

  async function populateDeck(collection) {
    const tempDeck = [];
    const tempCollection = [];
    while (tempDeck.length < 10) {
      const pushCardIndex = Math.floor(Math.random() * collection.length);
      if (!tempDeck.includes(pushCardIndex)) {
        tempDeck.push(pushCardIndex);
      }
    }
    for (let i = 0; i < tempDeck.length; i++) {
      tempCollection.push(collection[tempDeck[i]]);
    }
    return tempCollection;
  }

  async function pickStat(e) {
    const statName = e.target.name;
    const playerStat = playerActiveCard[statName];
    const aiStat = aiActiveCard[statName];
    let playerLost = false;
    console.log(`${aiActiveCard.name} has ${aiStat} ${statName}`);
    if (playerStat === aiStat) {
      console.log('draw');
      draw();
    } else if (playerStat > aiStat) {
      console.log('player wins');
      winRound();
    } else {
      console.log('ai wins');
      loseRound();
      playerLost = true;
    }
    setAiDeck(aiDeck.filter((card) => card.id !== aiActiveCard.id));
    setPlayerDeck(playerDeck.filter((card) => card.id !== playerActiveCard.id));
    // await sleep(1000);
    if (playerLost) {
      setActivePlayer(false);
    }
    console.log('playerDeck is', playerDeck);
  }
  function winRound() {
    setWonCards([...wonCards, playerActiveCard.id, aiActiveCard.id]);
  }
  function loseRound() {
    setGraveyard([...graveyard, playerActiveCard.id, aiActiveCard.id]);
  }
  function draw() {
    setWonCards([...wonCards, playerActiveCard.id]);
    setGraveyard([...graveyard, aiActiveCard.id]);
  }

  // React.useEffect(async () => {
  //   if (playerDeck) {
  //     let deckLength = playerDeck.length;
  //     let aiLost = false;
  //     for (let i = 0; i < deckLength; i++) {
  //       await sleep(1000);
  //       if (activePlayer) {
  //         break;
  //       }
  //       let highestStat = 0;
  //       let highestStatName;
  //       console.log('ACTIVE CARD:', aiActiveCard);
  //       for (let stat in aiActiveCard) {
  //         if (
  //           stat === 'charisma' ||
  //           stat === 'strength' ||
  //           stat === 'intelligence' ||
  //           stat === 'special'
  //         ) {
  //           if (aiActiveCard[stat] > highestStat) {
  //             highestStat = aiActiveCard[stat];
  //             highestStatName = stat;
  //           }
  //         }
  //       }
  //       let currentActivePlayer = activePlayer;
  //       let playerStat = playerActiveCard[highestStatName];
  //       console.log('PLAYER STAT:', playerStat);
  //       console.log('AI STAT: ', highestStat);
  //       if (playerStat === highestStat) {
  //         console.log('draw');
  //         draw();
  //       } else if (playerStat > highestStat) {
  //         console.log('player wins');
  //         winRound();
  //         aiLost = true;
  //       } else {
  //         console.log('ai wins');
  //         loseRound();
  //       }
  //       setAiDeck(aiDeck.filter((card) => card.id !== aiActiveCard.id));
  //       setPlayerDeck(
  //         playerDeck.filter((card) => card.id !== playerActiveCard.id)
  //       );
  //       console.log('playerDeck is', playerDeck);
  //       await sleep(1000);
  //       if (aiLost) {
  //         setActivePlayer(true);
  //         break;
  //       }
  //     }
  //   }
  // }, [activePlayer]);

  // async function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  const endgame = async () => {
    const newCollection = [
      ...simpleCollection.filter((card) => !graveyard.includes(card)),
      ...wonCards
    ];
    try {
      await updateCollection(sessionStorage.getItem('userid'), {
        collection: newCollection
      });
    } catch (err) {
      console.error(err);
    }
  };

  return !playerActiveCard ? (
    <p className="has-text-white">loading game</p>
  ) : (
    <div className="game-field">
      <div className="active-card">
        <h1>{playerActiveCard.name}</h1>
        <img
          src={`https://res.cloudinary.com/dthhn8y5s/${playerActiveCard.image}`}
          alt={playerActiveCard.name}
        />
        {/* {!!activePlayer ? ( */}
        <>
          <Link to="#" onClick={pickStat} name="strength" className="stat">
            Strength: {playerActiveCard.strength}
          </Link>
          <Link to="#" onClick={pickStat} name="charisma" className="stat">
            Charisma: {playerActiveCard.charisma}
          </Link>
          <Link to="#" onClick={pickStat} name="intelligence" className="stat">
            Intelligence: {playerActiveCard.intelligence}
          </Link>
          <Link to="#" onClick={pickStat} name="special" className="stat">
            Special: {playerActiveCard.special}
          </Link>
        </>
        {/* ) : (
        <>
          <p name="strength" className="stat">
            Strength: {playerActiveCard.strength}
          </p>
          <p name="charisma" className="stat">
            Charisma: {playerActiveCard.charisma}
          </p>
          <p name="intelligence" className="stat">
            Intelligence: {playerActiveCard.intelligence}
          </p>
          <p name="special" className="stat">
            Special: {playerActiveCard.special}
          </p>
        </>
      )} */}
      </div>
      {!!aiActiveCard && (
        <div className="active-card">
          <h1>{aiActiveCard.name}</h1>
          <img
            src={`https://res.cloudinary.com/dthhn8y5s/${aiActiveCard.image}`}
            alt={playerActiveCard.name}
          />
        </div>
      )}
    </div>
  );
};

export default Match;
