const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors=require("cors");

const corsOptions={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

const db=require('./config/database')
db.authenticate()
    .then(()=>console.log('Database Connected....'))
    .catch(er=>console.log('error'+er));

app.use(express.json());


app.use(require('./routes/users'));
app.use(require('./routes/posts'));
app.use(require('./routes/draftPosts'));

app.get("/", (req, res) => {
  res.send("homee page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
