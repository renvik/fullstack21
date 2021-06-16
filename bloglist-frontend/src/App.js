// importing usestate for state hooks, ctrl+shift+i formats with prettier
import React, { useState, useEffect } from 'react';
// import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  // state hooks: in the first one the initial state is an empty array
  // blog is the value, setBlogs is function that changes the value
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  //const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
//console.log(blogs)
  // hook that first renders
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { title: newBlog };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog('');
    });
  };
  const handleBlogChange = (event) => {
    console.log(event.target.value);
    setNewBlog(event.target.value);
  };
  // const blogsToShow = showAll;

  // selvitä missä yhteyksissä handle loginia kutsutaan
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with username', username);
  try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBloglistuser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
   } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type='submit'>save</button>
    </form>
  );

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <ul>{blogs.map(blog => <li>{blog.title}</li>)}</ul>
          {blogForm()}
        </div>
      )}
</div>
     
  );
};

export default App;
