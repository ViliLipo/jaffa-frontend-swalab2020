import React, { useState } from 'react';
import { postContent } from './api/content';

const FormModal = (props) => {
  const { isOpen } = props;
  const [formContent, setFormContent] = useState({ title: '', content: '' });
  const handleChange = (event) => {
    const etarget = event.target;
    if (etarget.className === 'titleInput') {
      setFormContent((prevContent) => {
        const newContent = { ...prevContent, title: etarget.value };
        return newContent;
      });
    } else if (etarget.className === 'contentInput') {
      setFormContent((prevContent) => ({ ...prevContent, content: etarget.value }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formContent, username: 'Jaakko331' };
    await postContent(data);
    setFormContent(() => ({ title: '', content: '' }));
  };
  if (isOpen) {
    return (
      <div>
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
