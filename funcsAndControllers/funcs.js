const { urlModel } = require("../schemasAndModels/SAM.js")

const findShortUrl = (url) => {
  let returnVal = ""
  urlModel.find({shortUrl: url}).then(data => {
    if (data.shortUrl == url) {
      returnVal = "TAKEN"
    } else {
      returnVal = "OPEN"
    }
    return returnVal
  })
}

const createShortURL = () => {
    let randomLimit = Math.round(Math.random() * 4) + 1
    let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let shortUrl = ""
    
    for (let i = 0; i < randomLimit; i++) {
      shortUrl += vals[Math.floor(Math.random() * 9)]
    }
    while (findShortUrl(shortUrl) == "TAKEN") {
      shortUrl = ""
      randomLimit = Math.floor(Math.random() * 4) + 1
      for (let i = 0; i < randomLimit; i++) {
        shortUrl += vals[Math.floor(Math.random() * 9)]
      }
    }
    return shortUrl
  }

module.exports = createShortURL