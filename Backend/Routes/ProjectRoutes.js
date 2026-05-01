import express from "express";
import { addProject, deleteProject, getProjects, updateProject } from "../Controller/ProjectController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addProject);
router.get("/", getProjects);



router.put("/update/:id", updateProject);


router.delete("/delete/:id", deleteProject);

export default router;