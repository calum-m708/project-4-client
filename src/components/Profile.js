import React from 'react';
import { credentials } from '../api/auth';
import { getAllCards } from '../api/card';
import CarouselUploaded from './CarouselUploaded';
import CarouselCollection from './CarouselCollection';

const Profile = () => {
  const [currentUser, setUser] = React.useState(null);
  const [uploadedCards, setUploadedCards] = React.useState(null);

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    const getData = async () => {
      try {
        const data = await credentials(token);
        setUser(data);
        const cards = await getAllCards();
        setUploadedCards(cards.filter((card) => card.created_by === data.id));
        console.log(uploadedCards);
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
