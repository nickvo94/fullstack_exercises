const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
require('dotenv')

const Blog = require('../models/blog')

const base = {'Authorization': process.env.TOKEN_TEST, 
    'Content-Type': 'application/json'};

beforeEach(async () => {
    await Blog.deleteMany({})

    /* for (let blog in helper.initialBlogs) {
        console.log(blog)
        let blogObj = new Blog(blog)
        await blogObj.save()
    } */

    const blogObj = helper.initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObj.map(b => b.save())
    await Promise.all(promiseArray)

})

describe('getting blogs tests', () => {

    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('check the id define from blogs', async () => {
        const response = await api.get('/api/blogs')
        const results = response.body
        const result0 = results[0]
        expect(Object.keys(result0).find(k => k === 'id' )).toBeDefined()
    
    })

})

describe('posting blog tests', () => {

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "testing post blog",
            author: "Olli Jorvi", 
            url: "https://test.com/", 
            likes: 8
        }
      
        await api
          .post('/api/blogs')
          .set(base)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
          'testing post blog'
        )
    })

    test('add an unauthorized blog ', async () => {
        const newBlog = {
            title: "testing none like value",
            author: "Meri", 
            url: "https://test.com/"
        }
      
        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
    })
    
    test('add a none like value blog added ', async () => {
        const newBlog = {
            title: "testing none like value",
            author: "Meri", 
            url: "https://test.com/"
        }
      
        const response = await api
          .post('/api/blogs')
          .set(base)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const result = response.body
        expect(result.likes).toBe(0)
    })

    test('add a missing required field blog', async () => {
        const newBlog = {
            author: "Mori",
        }
      
        const response = await api
          .post('/api/blogs')
          .set(base)
          .send(newBlog)
          .expect(400)
    })

})

describe('deletion blog tests', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set(base)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const titles = blogsAtEnd.map(r => r.title)
    
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating blog tests', () => {

    test('updating a blog ', async () => {
        const newBlog = {
            title: "React patterns",
            author: "Meri Chan", 
            url: "https://reactpatterns.com/", 
            likes: 1
        }
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
      
        const response = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(newBlog)
          .expect(200)

        const allBLogs = await helper.blogsInDb()
      
        const authors = allBLogs.map(n => n.author)
        expect(authors).toContain(
          'Meri Chan'
        )
    })

})


afterAll(() => {
    mongoose.connection.close()
})