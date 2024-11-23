import User from "../../../models/user.mjs"; // Đảm bảo đường dẫn chính xác

class ApiUserController {
    static async index(req, res) {
        try {
            let users = await User.find({});
            console.log(users);
            res.status(200).json({ message: "Load dữ liệu thành công!!", data: users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async show(req, res) {
        try {
            let id = req.params.id;
            let user = await User.findById(id); // Đúng phương thức
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng" });
            }
            res.status(200).json({ message: "Lấy dữ liệu thành công", data: user }); // Đúng tên biến
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async destroy(req, res) {
        try {
            let id = req.params.id;
            let data = await User.deleteOne({ _id: id });
            res.status(200).json({ message: "Xóa thành công!!", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async create(req, res) {
        try {
            let { name, email, workExperience, age } = req.body;
            let user = await User.create({ name, emailm, workExperience, age });
            res.status(200).json({ message: "Tạo mới thành công!!", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ApiUserController;