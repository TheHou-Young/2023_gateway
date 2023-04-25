const express = require('express')

const router = express.Router()

router.get('/', function (req, res, next){
  res.send("gateway service on consul is OK!");
})

module.exports = router