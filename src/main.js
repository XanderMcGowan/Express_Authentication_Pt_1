let express = require("express")
require("dotenv").config
let app = express()
let PORT = process.env.PORT || 9012

app.use(express.json)

let authRoutes = require("./routes/authRoutes")
app.use(authRoutes)

let helloRoutes = require("./routes/helloRoutes")
app.use(helloRoutes)

// app.use(todoRoutes)
// let todoRoutes = require("./routes")

app.listen(PORT, function(){
    console.log("Application is litenting on port", PORT)
})