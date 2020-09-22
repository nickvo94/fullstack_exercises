require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
let COLLECTION = process.env.COLLECTION


if (process.env.NODE_ENV === 'test') {
  COLLECTION = process.env.TEST_COLLECTION
}

module.exports = {
  MONGODB_URI,
  PORT,
  COLLECTION
}