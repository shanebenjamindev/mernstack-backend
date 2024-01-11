const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config()

const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("bye world")
})

mongoose.connect(`mongodb+srv://vophonggiang0205:${process.env.MONGODB}@cluster0.0jujm0l.mongodb.net/`)
    .then(() => {
        console.log("success!")
    })
    .catch((err) => {
        console.log(err);
    })
app.listen(port, () => {
    console.log("running in port" + port);
})