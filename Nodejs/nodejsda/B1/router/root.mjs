import express from "express"
import HomeController from "../../../controllers/home_controller.mjs"
import CvController from "../../../controllers/cv_controller.mjs"
const router = express.Router()




router.get("/about", (req, res) => {
    res.send(`<h1>This is about page<h1>`)
})

router.get("/", HomeController.index);

router.get("/cv/:id", CvController.detail);
export default router;