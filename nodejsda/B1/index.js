import express from "express"
import router from "./router/root.mjs"
import userRouter from "./router/user.mjs";
import bodyParser from "body-parser";
import methodOverride from 'method-override';
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

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use("/", router)
app.use("/user", userRouter)


app.listen(port, () => {
    console.log("Server started")

})