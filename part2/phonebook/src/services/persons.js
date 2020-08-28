import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  /* const nonExisted = {
    name: "Timo",
    number: "0467-098-02628",
    id: 1000
  } */
  return request
            .then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
          .then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request
          .then(response => response.data)
}

const deleteId = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
            .then(response => response)
}

export default { getAll, create, update, deleteId}