import User from "../nodejsda/B1/models/user.mjs"
class CvController {
    static async detail(req, res) {
        let data = await User.find({ age: { $in: [20, 30] } });

        let user = data[0];
        console.log(user);
        res.send(data)
            // let workExperience = user.workExperience;
            // console.log(req.params);
            // res.render("cv", { title: "Home Page", workExperience });
    }
}

export default CvController;