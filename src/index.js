const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

app.get('/', (req, res) => {
    res.send("bye world")
})


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("success!")
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log("running in port" + port);
})