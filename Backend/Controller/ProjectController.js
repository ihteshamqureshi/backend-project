
import Project from "../Model/Form.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// POST
export const addProject = async (req, res) => {
  try {

    let imageUrl = "";

    // image upload
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });

      imageUrl = upload.secure_url;

      // delete local file
      fs.unlinkSync(req.file.path);
    }


    const newProject = await Project.create({
      ...req.body,
      Features: JSON.parse(req.body.Features || "[]"),
      screenshots: JSON.parse(req.body.screenshots || "[]"),
      thumbnailimage: imageUrl,
    });


    return res.status(201).json({
      success: true,
      message: "Project saved successfully",
      data: newProject,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error saving project",
      error: error.message,
    });
  }
};






// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      data: projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};



// UPDATE project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Project updated",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};





// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Project deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};