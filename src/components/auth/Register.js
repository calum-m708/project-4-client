import React from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    const getData = async () => {
      try {
        await registerUser(user);
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }

  return (
    <section className="is-fullheight-with-navbar form-page">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label has-text-centered">Username</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Email</label>
              <div className="control">
                <input
                  className="input"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-centered">
                Password Confirmation
              </label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  name="password_confirmation"
                  onChange={handleChange}
                  value={user.password_confirmation}
                />
              </div>
            </div>
            <div className="field">
              <button
                type="submit"
                className="button label is-fullwidth is-success"
              >
                Register Me!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
