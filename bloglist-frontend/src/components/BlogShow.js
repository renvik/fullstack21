import React, { useState } from 'react';

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

export default BlogShow;