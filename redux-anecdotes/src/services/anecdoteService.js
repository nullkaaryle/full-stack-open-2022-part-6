import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

// for sorting the anecdotes here we could use axios' sort method:
//    const response = await axios.get(baseUrl + '?_sort=votes,content&_order=desc,asc')
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const id = getId()
  const votes = 0
  const object = { id, content, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateOne = async (object) => {
  const id = object.id
  const response = await axios.put(baseUrl + '/' + id, object)
  return response.data
}


const anecdoteService = {
  getAll,
  createNew,
  updateOne
}

export default anecdoteService
