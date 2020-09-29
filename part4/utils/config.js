require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
let USER_COLLECTION = process.env.USER_TEST_COLLECTION
let COLLECTION = process.env.COLLECTIONTEST_COLLECTION


if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  COLLECTION = process.env.TEST_COLLECTION
}

module.exports = {
  MONGODB_URI,
  PORT,
  COLLECTION,
  USER_COLLECTION
}