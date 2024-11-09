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
            // console.log(req.params.id)
            let id = req.params.id
            let { deleteCount } = await User.deleteOne({ _id: id })
            if (deleteCount == 0) {
                console.log("Không xóa được!!")
            } else {
                console.log("Đã Xóa được")
            }
            res.redirect("/user")
        }
        // Phương thức hiển thị form chỉnh sửa
    static async edit(req, res) {
        const id = req.params.id;
        const user = await User.findById(id);

        if (user) {
            res.render("formedit", { title: "Edit User", user, error: null });
        } else {
            res.redirect("/user");
        }
    }

    // Phương thức cập nhật thông tin người dùng
    static async update(req, res) {
        const id = req.params.id;
        const { name, email, age } = req.body;

        try {
            await User.findByIdAndUpdate(id, { name, email, age });
            res.redirect("/user");
        } catch (error) {
            console.error(error);
            const user = { _id: id, name, email, age };
            res.render("formedit", { title: "Edit User", error: "Cập nhật thất bại!", user });
        }
    }
}

export default UserController