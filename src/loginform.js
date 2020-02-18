import React, { useState } from 'react';
import { postLogin } from './api/login';

const LoginForm = (props) => {
  const { onLogin } = props;
  const [formContent, setFormContent] = useState({
    username: '',
    password: '',
  });
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
    onLogin(credentials);
    setFormContent(() => ({ username: '', password: '' }));
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
    </div>
  );
};

export default LoginForm;
