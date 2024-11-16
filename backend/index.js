const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const userRoute = require('./routes/userRoutes')
const uploadRoute = require('./routes/uploadedRoutes')

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}))


app.get('/', (req, res) => {
    res.send("Server is running..")
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/user', userRoute)

app.use("/api/files",uploadRoute)


mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

app.listen(5000, () => {
    console.log("server is running.. 5000")
})