import React from 'react';
import CardCard from './CardCard';
import { getAllCards } from '../api/card';

const CardIndex = () => {
  const [cards, setCards] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllCards();
        setCards(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {!cards ? (
            <p>Loading Cards...</p>
          ) : (
            cards.map((card) => <CardCard key={card.id} {...card}></CardCard>)
          )}
        </div>
      </div>
    </section>
  );
};

export default CardIndex;
