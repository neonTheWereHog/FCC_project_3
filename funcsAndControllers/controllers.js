const createShortURL = require("./funcs.js")
const { urlModel } = require("../schemasAndModels/SAM.js")

const farOrCar = (req, res) => {
  const { url } = req.body
  let newUrl;

  fetch(url).then((response) => {
    urlModel.find({longUrl: url}).then((data) => {

      if (data.length === 0) {
        newUrl = new urlModel({
          longUrl: url,
          shortUrl: createShortURL()
        })
        newUrl.save().then((d) => {
          return res.json({original_url: d.longUrl, short_url: d.shortUrl})
        })
        
      } else {
        urlObj = data[0]
        return res.json({original_url: urlObj.longUrl, short_url: urlObj.shortUrl})
      }
    })
  }).catch(err => {
    return res.json({error: "invalid url"})
    })
  }

const redirect = (req, res) => {
    const { shortUrl } = req.params;
    urlModel.find({shortUrl: shortUrl}).then((data) => {
      if (data.length > 0) {
        res.redirect(data[0].longUrl)
      } else {
        res.json({error: "invalid short url"})
      }
    })
  }

  let deleteURL = (req, res) => {
    const { url } = req.params
    urlModel.findOneAndDelete({shortUrl: url}).then((data) => {
      return res.json({success: true})
    }).catch((err) => {
      return res.json({success: false, error: err})
    })
  }

  module.exports = { farOrCar, redirect, deleteURL }