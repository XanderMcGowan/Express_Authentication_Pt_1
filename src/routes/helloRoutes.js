let express = require("express")
const route = require("./authRoutes")

let router = express.Router()

let authsMiddleware = require("../middleware/auths")

route.get("/hello", function(req,res){
    res.json("hello There!")
})


route.get("/handshake", authsMiddleware.checkJWT, function(req,res){
    res.json("waddup")
})

module.exports = router

