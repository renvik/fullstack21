// ctrl+shift+i formats with prettier
import React, { useState, useEffect } from 'react';
// import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
// 1. buttonin tekstin vaihto view->hide
// 2. sitten blogin kaikkien kenttien näyttö

const BlogShow = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(showDetails)
  return (
    <div>
      {blog.title} <button onClick={()=> setShowDetails(!showDetails)}>view</button>
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

  //  console.log(blogs) -> prints all blogs on the browser's console
  // hook that first renders
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // handleLogin should be invoked in loginForm
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

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //       <input
  //         type='text'
  //         value={username}
  //         name='Username'
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //       <input
  //         type='password'
  //         value={password}
  //         name='Password'
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // );
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
              <li>
                <BlogShow blog={blog} />
              </li>
            ))}
          </ul>
          {blogForm()}
        </div>
      )}
    </div>
  );
};
// r. 130 was <BlogForm handleAddBlog={(blog) => setBlogs(blogs.concat(blog))} />
export default App;
