const express = require("express");

const Projects = require("./projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  id = null;
  try {
    const projects = await Projects.get(req.query.id);
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the projects"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the project"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the project"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The project has been deleted" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the project"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

router.get("/:id/action", async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);

    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting the actions for the project"
    });
  }
});
