import User from '../nodejsda/B1/models/user.mjs'
class HomeController {
    static index(req, res) {
        console.log(req.query);
        res.render("index", { title: "Home Page" });
    }
    static about(req, res) {
        res.send(`<h1> Hello About Page!!</h1>`);
    }
    static login(req, res) {
        res.render("login", { titile: "<h1> Hello Login Page!!</h1>" });
    }
    static async createLogin(req, res) {
        console.log(req.body)
        let { email, password } = req.body;

        let user = await User.findOne({ email })
        console.log(user)
        if (user) {
            let checkpass = user.password == password;
            if (checkpass) {
                req.session.user = user
                res.redirect("/")
            } else {
                res.render("login", { titile: "<h1> Hello Login Page!!</h1>" });
            }

        } else {
            res.render("login", { titile: "<h1> Hello Login Page!!</h1>" });
        }

    }
}

export default HomeController;