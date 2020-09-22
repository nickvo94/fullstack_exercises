const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    /* Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }) */

      const blogs = await Blog.find({})
      response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {

    /* try {
      const blog = await Blog.findById(request.params.id)
      response.json(blog)  
    } catch (e) {
      next(e)    
    } */
    
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})
  
blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.title && !request.body.url) {
    return response.status(400).json({error: 'Bad request'})
  } else {
    const blog = new Blog(request.body)

    console.log('pass the return point ......', blog)

    try {
      const savedBLog = await blog.save()
      response.status(201).json(savedBLog)      
    } catch ( error ) {
      next(error)      
    }

  }
    
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  const blog = {
    title: body.title,
    author: body.author, 
    url: body.url, 
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter