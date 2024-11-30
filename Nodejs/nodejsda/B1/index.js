import express from "express";
import router from "./router/root.mjs";
import userRouter from "./router/user.mjs";
import bodyParser from "body-parser";
import methodOverride from 'method-override';
import { connectDB } from "./config/connectDB.mjs";
import session from "express-session";

const app = express();
const port = 5000;

// Kết nối cơ sở dữ liệu
connectDB();


app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
)

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Sử dụng thư mục tĩnh
app.use(express.static('public'));

// Phân tích body URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Phân tích body JSON
app.use(bodyParser.json());

// Sử dụng method-override để hỗ trợ HTTP verbs khác như PUT hoặc DELETE
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Cấu hình router
app.use("/", router);
app.use("/user", userRouter);

// Lắng nghe trên cổng
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});