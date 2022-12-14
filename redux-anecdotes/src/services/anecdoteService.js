import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

// gets all data from baseurl
// json-server serves json data from db.json (defined in package.json)
// for sorting the anecdotes here we could use:
//    const response = await axios.get(baseUrl + '?_sort=votes,content&_order=desc,asc')
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// if no id is given for new object,
// it is autogenerated
const createNew = async (content) => {
  const id = getId()
  const votes = 0
  const object = { id, content, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// updated object is given as parameter,
// (but maybe the id should also be given as the second parameter!)
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
