import React, { useState, useEffect } from 'react';
import { getContent } from './api/content';
import './App.css';

function Content(props) {
  const { contentList } = props;
  return (
    <div className="Content">
      <ul>{contentList.map((post) => (<li key={post.id}><Post post={post} /></li>))}</ul>
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
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.user}</div>
      <ul>{commentList}</ul>
    </div>
  );
}

function Comment(props) {
  const { comment } = props;
  return (
    <div>
      <div>
        {comment.content}
      </div>
      <div>
        {comment.user}
      </div>
    </div>
  );
}

function App() {
  const [contentList, setContentList] = useState([]);
  useEffect(() => {
    async function fetchContent() {
      const data = await getContent();
      setContentList(data);
    }
    fetchContent();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Content contentList={contentList} />
      </header>
    </div>
  );
}

export default App;
