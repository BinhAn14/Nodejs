import express from "express"
import router from "./router/root.mjs"
import userRouter from "./router/user.mjs";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
import { connectDB } from "./config/connectDB.mjs";
connectDB();
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use("/", router)
app.use("/user", userRouter)


app.listen(port, () => {
    console.log("Server started")

})