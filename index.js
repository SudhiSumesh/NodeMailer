const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRouter=require('./Routes/auth')
const app = express();
const PORT = process.env.PORT || 3001;

//Db connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
  
//middlewares
app.use(express.json())

//Auth Routes
app.use("/auth",authRouter)

// start server
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
