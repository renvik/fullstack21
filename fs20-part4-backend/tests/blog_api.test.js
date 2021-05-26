const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  { _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0 },
  { _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const blogWithoutLikes = {
  title: 'Think Again',
  author: 'David Grant',
  url: 'www.thinkingagain.com'
}
const blogWithoutTitleUrl = {
  author: 'David Grant',
  likes: 12
}

// formats database before each test:
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})
// first test: returned content is in json-format:
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
// second test: amount of blogs is correct:
test('amount of returned blogs matches', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})
// third test: if likes is null then the value will be 0
test('blog likes should be 0 if not available', async () => {
  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)

  const blogList = await (await api.get('/api/blogs')).body.map(r => r.likes)
  expect(blogList).toContain(0)
})
// fourth test: if a blog does not have title and url, api responses with 400
test('blog without title and url causes 400 error', async () => {
  await api
    .post('/api/blogs')
    .send(blogWithoutTitleUrl)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})