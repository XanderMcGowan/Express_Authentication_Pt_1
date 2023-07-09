let express = require("express")
const route = require("./authRoutes")

let router = express.Router()

let authsMiddleware = require("../middleware/auths")

route.get("/unprotected", function(req,res){
    res.json("hello There!")
})


route.get("/protected", authsMiddleware.checkJWT, function(req,res){
    res.json("waddup")
})

module.exports = router

