import React from 'react';
import { useNavigate } from 'react-router';
import { createCard } from '../api/card';

const CreateCard = () => {
  const navigate = useNavigate();
  const [newCard, setNewCard] = React.useState({
    name: '',
    strength: 0,
    charisma: 0,
    intelligence: 0,
    special: 0,
    image: ''
  });
  const statsTotal = 250;
  const [currentTotal, setCurrentTotal] = React.useState(statsTotal);

  React.useEffect(() => {
    const statsUsed =
      parseInt(newCard.strength) +
      parseInt(newCard.charisma) +
      parseInt(newCard.intelligence) +
      parseInt(newCard.special);
    console.log(`total ${statsTotal}, used ${statsUsed}`);
    setCurrentTotal(statsTotal - statsUsed);
  }, [newCard]);

  function handleChange(event) {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(newCard);
    if (currentTotal > 0) {
      window.alert(`You have ${currentTotal} points left to allocate`);
    } else if (currentTotal < 0) {
      window.alert(
        `You have exceeded the stat total for this card. Remove ${
          currentTotal * -1
        } points`
      );
    } else {
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
    <section className="is-fullheight-with-navbar has-background-dark form-page">
      <div className="container pt-6">
        <div className="columns pt-6">
          <form
            className="column is-half is-offset-one-quarter box has-background-grey"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label has-text-centered">Name</label>
              <div className="control">
                <input
                  className="input has-background-grey-lighter"
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
                  className="input has-background-grey-lighter"
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
                  className="input has-background-grey-lighter"
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
                  className="input has-background-grey-lighter"
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
                  className="input has-background-grey-lighter"
                  name="special"
                  type="number"
                  onChange={handleChange}
                  value={newCard.special}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Image</label>
              <button
                className="button has-background-grey-lighter"
                onClick={handleUpload}
              >
                Click to upload an image
              </button>
            </div>
            <div className="field">
              <button
                type="submit"
                className="button label has-background-success has-text-centered"
              >
                Submit Card
              </button>
            </div>
            <h4>{currentTotal}</h4>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCard;
