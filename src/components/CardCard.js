import React from 'react';
import { Link } from 'react-router-dom';

const CardCard = ({ id, name, image }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/cards/${id}`}>
        <h2 className="is-centered card-header-title has-text-white">{name}</h2>
        <figure className="image">
          <img src={`https://res.cloudinary.com/dthhn8y5s/${image}`}></img>
        </figure>
      </Link>
    </div>
  );
};

export default CardCard;
