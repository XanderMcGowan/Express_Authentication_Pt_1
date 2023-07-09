let express = require("express")
require("dotenv").config
let app = express()
let PORT = process.env.PORT || 9012

app.use(express.json)

let authRoutes = require("./routes/authRoutes")
app.use(authRoutes)

let proRoutes = require("./routes/proRoutes")
app.use(proRoutes)

app.listen(PORT, function(){
    console.log("Application is litenting on port", PORT)
})