import express from "express"
import HomeController from "../../../controllers/home_controller.mjs"
import CvController from "../../../controllers/cv_controller.mjs"

function checkLogin(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/login")
    }
}

const router = express.Router()




router.get("/about", (req, res) => {
    res.send(`<h1>This is about page<h1>`)
})

router.get("/", checkLogin, HomeController.index);

router.get("/cv/:id", CvController.detail);
router.get("/login", HomeController.login);
router.post("/login", HomeController.createLogin);
export default router;