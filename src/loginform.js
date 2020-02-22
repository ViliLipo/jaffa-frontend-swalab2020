import React, { useState } from 'react';
import { postLogin } from './api/login';

const LoginForm = (props) => {
  const { onLogin } = props;
  const [formContent, setFormContent] = useState({
    username: '',
    password: '',
  });
  const [errorDisplay, setErrorDisplay] = useState('');
  const handleChange = (event) => {
    const etarget = event.target;
    if (etarget.className === 'usernameInput') {
      setFormContent((prevContent) => {
        const newContent = { ...prevContent, username: etarget.value };
        return newContent;
      });
    } else if (etarget.className === 'passwordInput') {
      setFormContent((prevContent) => ({
        ...prevContent,
        password: etarget.value,
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formContent;
    const credentials = await postLogin(username, password);
    if (credentials) {
      setFormContent(() => ({ username: '', password: '' }));
      onLogin(credentials);
    } else {
      setErrorDisplay('Wrong username or password');
    }
  };
  return (
    <div>
      <div> Login </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              className="usernameInput"
              type="text"
              value={formContent.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              className="passwordInput"
              type="password"
              value={formContent.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div className="ErrorDisplay">
        {errorDisplay}
      </div>
    </div>
  );
};

export default LoginForm;
