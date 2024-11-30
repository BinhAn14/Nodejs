import User from '../nodejsda/B1/models/user.mjs'


class ApiUserController {
    static async index(req, res) {
        try {
            let users = await User.find({});
            console.log(users);
            res
                .status(200)
                .json({ message: "Load du lieu thanh cong!!", data: users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async show(req, res) {
        try {
            let id = req.params.id;
            let user = await User.findById(id);
            res.status(200).json({ message: "Lấy dữ liệu thành công!!", data: user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async destroy(req, res) {
        try {
            let id = req.params.id;
            let data = await User.deleteOne({ _id: id });
            res.status(200).json({ message: "Xoa liệu thành công!!", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async create(req, res) {
        try {
            let { name, email, workExperience, age } = req.body;
            let user = await User.create({ name, email, workExperience, age });
            res.status(200).json({ message: "Tao Du liệu thành công!!", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ApiUserController;