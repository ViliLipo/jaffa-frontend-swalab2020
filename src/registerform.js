import React, { useState } from 'react';
import { postUser } from './api/user';

const RegisterForm = () => {
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
    const credentials = await postUser(username, password);
    if (!credentials) {
      console.log('error in form');
    }
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
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
