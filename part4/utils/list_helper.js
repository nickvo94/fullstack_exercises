const { get, maxBy } = require('lodash');
var _ = require('lodash');

/* const b = [ 
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
] */

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
  let total = 0;
  if (blogs.length > 0) {
    total = blogs.reduce( (sum, next) => sum += Number(next.likes), 0)
  } 
  return total;
}

const getFavoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let mostLike = blogs.reduce( (max, next) => {
      if (max) {
        return Number(max.likes) > Number(next.likes) ? max : next
      }
      else {
        return next
      }
    })
    //console.log(mostLike)
    return mostLike
  } 
  return null;
}

const getMostBlogs = (blogs) => {
  if ( blogs.length > 0 ) {
    let result = _(blogs)
    .groupBy('author')
    .map(function(item, itemId) {
      var obj = {};
      obj['author'] = itemId
      obj['blogs'] = item.length
      return obj
    }).maxBy('blogs')

    console.log(result)
    return result
  }
  return null  
}

const getMostLikes = (blogs) => {
  if ( blogs ) {
    let result = _(blogs)
    .groupBy('author')
    .map(function(item, itemId) {
      var obj = {};
      obj['author'] = itemId
      obj['likes'] = _.sumBy(item, 'likes')
      return obj
    }).maxBy('likes')
    
    console.log(result)
    return result
  }
  return null
}

module.exports = {
  dummy, totalLikes, getFavoriteBlog, getMostBlogs, getMostLikes
}