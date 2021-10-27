// ctrl+shift+i formats with prettier
import React, { useState, useEffect } from 'react';
// import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

// this components controls whether all the blog fields are shown or not
// the initial state is false and if the state is true all the fields are shown and button title is "hide"
const BlogShow = ({ blog, addLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  //console.log(showDetails);
  return (
    <div>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails ? (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button type='button' onClick={addLike}>
            like
          </button>
        </div>
      ) : null}
    </div>
  );
};

const App = () => {
  // state hooks: in the first one the initial state is an empty array
  // blog is the value, setBlogs is function that changes the value
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // hook that first renders
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);
  console.log(blogs);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const addLike = (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    };
    blogService
      .update(blogObject.id, updatedBlog)
      .then((response) => {
        setBlogs(
          blogs
            .map((blog) => (blog.id !== blogObject.id ? blog : response))
            .sort((a, b) => b.likes - a.likes)
        );
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with username', username);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
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

  const handleLogout = () => {
    console.log('kutsuttu');
    window.localStorage.clear();
    setUser(null);
  };
  // **muokkaa tämä - missä käytetään?
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </p>

          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <BlogShow blog={blog} addLike={() => addLike(blog)} />
              </li>
            ))}
          </ul>
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
