import React from 'react';
import { useNavigate } from 'react-router';
import { createCard } from '../api/card';

const CreateCard = () => {
  const navigate = useNavigate();
  const [newCard, setNewCard] = React.useState({
    name: '',
    strength: '',
    charisma: '',
    intelligence: '',
    special: '',
    image: ''
  });
  function handleChange(event) {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(newCard);
    newCard.strength = parseInt(newCard.strength);
    newCard.charisma = parseInt(newCard.charisma);
    newCard.intelligence = parseInt(newCard.intelligence);
    newCard.special = parseInt(newCard.special);
    const getData = async () => {
      try {
        await createCard(newCard);
        navigate('/cards');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }
  async function handleUpload(e) {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dthhn8y5s',
          uploadPreset: 'card-image',
          cropping: true
        },
        (err, result) => {
          if (result.event != 'success') {
            return;
          }
          setNewCard({
            ...newCard,
            image: result.info.secure_url.slice(37)
          });
        }
      )
      .open();
  }

  return (
    <section className="is-fullheight-with-navbar">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label has-text-centered">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={newCard.name}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Strength</label>
              <div className="control">
                <input
                  className="input"
                  name="strength"
                  type="number"
                  onChange={handleChange}
                  value={newCard.strength}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Charisma</label>
              <div className="control">
                <input
                  className="input"
                  name="charisma"
                  type="number"
                  onChange={handleChange}
                  value={newCard.charisma}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Intelligence</label>
              <div className="control">
                <input
                  className="input"
                  name="intelligence"
                  type="number"
                  onChange={handleChange}
                  value={newCard.intelligence}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Special</label>
              <div className="control">
                <input
                  className="input"
                  name="special"
                  type="number"
                  onChange={handleChange}
                  value={newCard.special}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Image</label>
              <button className="button" onClick={handleUpload}>
                Click to upload an image
              </button>
            </div>
            <div className="field">
              <button type="submit" className="button label">
                Submit Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCard;
