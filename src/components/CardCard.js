import React from 'react';
import { Link } from 'react-router-dom';

const CardCard = ({ id, name, image }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/cards/${id}`}>
        <h2 className="is-centered card-header-title">{name}</h2>
        <figure className="image is-1by1">
          <img src={`https://res.cloudinary.com/dthhn8y5s/${image}`}></img>
        </figure>
      </Link>
    </div>
  );
};

export default CardCard;
