import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
            .then(response => response.data)
              .catch(error => { window.alert(`${error}`) })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
          .then(response => response.data)
            .catch(error => { window.alert(`${error}`) })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request
          .then(response => response.data)
            .catch(error => { window.alert(`${error}`) })
}

const deleteId = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
            .then(response => response)
              .catch(error => {window.alert(`${error}`)})
}

export default { getAll, create, update, deleteId}