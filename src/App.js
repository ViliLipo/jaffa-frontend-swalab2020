import React, { useState, useEffect } from 'react';
import { getContent } from './api/content';
import FormModal from './formmodal';
import LoginForm from './loginform';
import RegisterForm from './registerform';
import tokenstore from './api/tokenstore';
import './App.css';

function Content(props) {
  const { contentList } = props;
  return (
    <div className="Content">
      <div> Jaffa posts </div>
      <ul>
        {contentList.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Post(props) {
  const { post } = props;
  const commentList = post.comments.map((comment) => (
    <li key={comment.id}>
      <Comment comment={comment} />
    </li>
  ));
  return (
    <div className="Post">
      <div className="PostTitle">
        Title:
        {post.title}
      </div>
      <div className="PostContent">
        Content:
        {post.content}
      </div>
      <div className="PostUser">
        User:
        {post.user}
      </div>
      <ul>{commentList}</ul>
    </div>
  );
}

function Comment(props) {
  const { comment } = props;
  return (
    <div className="Comment">
      <div className="CommentContent">
        {comment.content}
      </div>
      <div className="CommentUser">
        {comment.user}
      </div>
    </div>
  );
}

function App() {
  const [contentList, setContentList] = useState([]);
  const [view, setView] = useState('content');
  useEffect(() => {
    async function fetchContent() {
      const data = await getContent();
      setContentList(data);
    }
    fetchContent();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  if (view === 'content') {
    return (
      <div className="App">
        <div> Just a fun forum!</div>
        <button
          type="button"
          onClick={() => { setView(() => 'login'); }}
        >
          {' '}
          login
        </button>
        <button
          type="button"
          onClick={() => { setView(() => 'register'); }}
        >
          {' '}
          Register
        </button>
        <Content contentList={contentList} />
        <button
          type="button"
          onClick={() => { setModalOpen((prev) => !prev); }}
        >
          {modalOpen ? '-' : '+' }
        </button>
        <FormModal
          isOpen={modalOpen}
          onPost={(post) => setContentList([...contentList, post])}
        />
      </div>
    );
  }
  if (view === 'login') {
    return (
      <div className="App">
        <LoginForm
          onLogin={(credentials) => {
            tokenstore.setToken(credentials.token);
            setView('content');
          }}
        />
        <button
          type="button"
          onClick={() => { setView(() => 'content'); }}
        >
          back
        </button>
      </div>
    );
  }
  if (view === 'register') {
    return (
      <div className="App">
        <RegisterForm />
        <button
          type="button"
          onClick={() => { setView(() => 'content'); }}
        >
          back
        </button>
      </div>
    );
  }
}

export default App;
