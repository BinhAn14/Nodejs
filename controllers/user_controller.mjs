import { title } from "process"
import User from "../nodejsda/B1/models/user.mjs"
class UserController {
    static async index(req, res) {
        let q = req.query.q;
        const re = new RegExp(q, 'i');
        let users;
        if (q) {
            users = await User.find({ $or: [{ name: re }, { email: re }] });
        } else {
            users = await User.find();
        }


        // console.log(users)
        res.render("user", { title: "User management", users, q })
    }
    static async new(req, res) {
        res.render("formnew", { title: "User management", users: [], q: "" })
    }
    static async create(req, res) {

        let { email, name, age } = req.body;

        let user = await User.create({ email, name, age })
        console.log(user)
        if (user) {
            res.redirect("/user")
        } else {

            res.render("formnew", { title: "User management" })
        }
    }
    static async delete(req, res) {
        console.log("delete")
        res.redirect("/user")
    }
}

export default UserController