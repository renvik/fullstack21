import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      handleAddBlog(returnedBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id = 'title'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      {/*<input value={newBlog} onChange={handleBlogChange} />*/}
      <button id='create-button' type='submit'>create</button>
      <div></div>
    </form>
  );
};
export default BlogForm;
