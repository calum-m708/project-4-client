import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardById } from '../api/card';

const ShowCard = () => {
  const { id } = useParams();
  const [card, setCard] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCardById(id);
        setCard(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [id]);

  return (
    <section className="section hero is-fullheight-with-navbar">
      <div className="container">
        {!card ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="title has-text-centered">{card.name}</h2>
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img
                    src={`https://res.cloudinary.com/dthhn8y5s/${image}`}
                    alt={card.name}
                  />
                </figure>
              </div>
              <div className="column is-half">
                <h3>Stats</h3>
                <p>Strength: {card.strength}</p>
                <p>Charisma: {card.charisma}</p>
                <p>Intelligence: {card.intelligence}</p>
                <p>Special: {card.special}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowCard;
