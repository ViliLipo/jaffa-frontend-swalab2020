import React, { useState } from 'react';
import { postContent } from './api/content';

const FormModal = (props) => {
  const { isOpen, onPost } = props;
  const [formContent, setFormContent] = useState({ title: '', content: '' });
  const [errorMsg, setErrorMsg] = useState({ visible: 'false', content: '' });
  const handleChange = (event) => {
    const etarget = event.target;
    if (etarget.className === 'titleInput') {
      setFormContent((prevContent) => {
        const newContent = { ...prevContent, title: etarget.value };
        return newContent;
      });
    } else if (etarget.className === 'contentInput') {
      setFormContent((prevContent) => ({
        ...prevContent,
        content: etarget.value,
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formContent, username: 'Jaakko331' };
    const newPost = await postContent(data);
    if (newPost) {
      setFormContent(() => ({ title: '', content: '' }));
      onPost(newPost);
      setErrorMsg(() => ({ visible: false, content: '' }));
    } else {
      setErrorMsg(() => ({
        visible: true,
        content: 'Your content did not pass the moderation',
      }));
    }
  };
  if (isOpen) {
    return (
      <div>
        {errorMsg.visible ? (<div>{errorMsg.content}</div>) : <div />}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                className="titleInput"
                type="text"
                value={formContent.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Content:
              <textarea
                className="contentInput"
                value={formContent.content}
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
  }
  return (<div />);
};


export default FormModal;
