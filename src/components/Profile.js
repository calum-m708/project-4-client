import React from 'react';
import { credentials } from '../api/auth';
import { getUserCards } from '../api/card';
import CarouselUploaded from './CarouselUploaded';
import CarouselCollection from './CarouselCollection';
import { Link, useLocation } from 'react-router-dom';
const Profile = () => {
  let location = useLocation();
  const [uploadedCards, setUploadedCards] = React.useState(null);
  const [currentUser, setUser] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const cards = await getUserCards(token);
        setUploadedCards(cards);
        const userdata = await credentials(token);
        setUser(userdata);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    currentUser && (
      <>
        <h1>Welcome back {currentUser.username}</h1>
        <h3>Current Collection</h3>
        {currentUser.collection.length < 1 ? (
          <p>
            You have no cards, go through the{' '}
            <Link to="/cards">Card Index</Link> and add 10 cards to your
            collection
          </p>
        ) : (
          // <p>Collection goes here</p>
          <CarouselCollection collection={currentUser.collection} />
        )}
        <h3>Your uploaded Cards</h3>
        {uploadedCards?.length < 1 ? (
          <p>
            Upload some cards by clicking <Link to="/create">here</Link>
          </p>
        ) : (
          <CarouselUploaded uploadedCards={uploadedCards} />
        )}
      </>
    )
  );
};

export default Profile;
