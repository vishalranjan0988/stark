const express = require("express")
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")
const users = require("./models/userSchema.js")
const router = require("./routes/route.js")
const dotenv =  require("dotenv");
const PORT = process.env.port || 8000
const path = require('path')


app.use(cors())
app.use(express.json())
dotenv.config();

app.use(router);


//to serve the frontend
app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", (req, res)=>{
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err){
            res.status(500).send(err)
        }    
    )
})
   

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

  
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))