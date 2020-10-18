import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  console.log('before modified Blog', newObject)
  const config = {
    headers: { Authorization: token },
  }
  const modifiedBlog = {
    user: newObject.user ? newObject.user.id : '',
    likes: newObject.likes,
    author: newObject.author,
    title: newObject.title,
    url: newObject.url
  }
  console.log('modified Blog', modifiedBlog)
  const response = await axios.put(baseUrl + '/' + newObject.id, modifiedBlog, config)
  return response.data
}

const deleteBlog = async id => {
  //console.log('before modified Blog', newObject)
  const config = {
    headers: { Authorization: token },
  }
  
  //console.log('modified Blog', modifiedBlog)
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

export default { getAll, create, update, deleteBlog, setToken }