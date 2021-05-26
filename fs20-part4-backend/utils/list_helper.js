// function for dummy.test.js, gets array (of blogs) as argument and returns always 1
const dummy = blogs => {
  return 1
}
// counts sum of all blogs:
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}
// looks up and prints the blog with most likes, in practice compares blog-objects using jest's toEqual-method in order to find the favoriteBlog
const favoriteBlog = (blogs) => {
  //return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
  const result = blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
  console.log(result)
  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
