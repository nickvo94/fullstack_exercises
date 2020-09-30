require('dotenv')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const verifyToken = request => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log('decoded token ', decodedToken)
  return decodedToken

}

blogsRouter.get('/', async (request, response) => {

      const blogs = await Blog.find({})
        .populate('user', {username: 1 ,name: 1, id: 1})
      response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})
  
blogsRouter.post('/', async (request, response, next) => {

  const decodedToken = verifyToken(request)

  const user = await User.findById(decodedToken.id)

  if (!request.body.title && !request.body.url) {
    return response.status(400).json({error: 'Bad request'})
  } else {
    const body = request.body

    //const user = await User.findById(body.userId)

    const blog = new Blog ({
      title: body.title,
      author: body.author, 
      url: body.url, 
      likes: body.likes,
      user: user._id
    })

    console.log('pass the return point ......', blog)

    try {
      const savedBLog = await blog.save()
      user.blogs = user.blogs.concat(savedBLog._id)
      await user.save()

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
  const decodedToken = verifyToken(request)

  const blog = await Blog.findById(request.params.id)

  console.log('blog ', blog)

  if (!blog) {
    return response.status(400).json({error: 'no blog found'})
  }

  if (blog.user && blog.user.toString() !== decodedToken.id) {
    return response.status(400).json({error: 'wrong user'})
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter