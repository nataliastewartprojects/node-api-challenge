const express = require("express");

//import the data base
const projectModel = require("../data/helpers/projectModel.js");

//import router from express
const router = express.Router();

router.use(express.json()); //middleware JSON

//----ENDPOINTS start here:

//--GET projects
router.get("/", function (req, res) {
  projectModel
    .get()
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((error) => {
      console.log("catch error - GET projects", error);
      res.status(500).json({
        errormessage: "The projects could not be found - status 500",
      });
    });
});

//POST - insert - project
router.post("/", function (req, res) {
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res.status(400).json({
      message: "Please, provide the name and description",
    });
  } else {
    try {
      projectModel.insert(newProject);
      res.status(201).json(newProject);
    } catch {
      res
        .status(500)
        .json({ error: "Error to create a new project to database" });
    }
  }
});

//PUT - UPDATE - projects
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedP = req.body;

  projectModel
    .update(id, updatedP)
    .then((item) => {
      if (item.id == id) {
        res.status(201).json({ ...updatedP });
      } else {
        res
          .status(404)
          .json({ message: "The post with the speciefied ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error, "catch error to Update the project");
      res
        .status(500)
        .json({ error: "The post informationd could not be modified." });
    });
});

//REMOVE - Delete - project

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectModel
    .remove(id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      console.log("catch error - DELETE project", error);
      res.status(500).json({
        errormessage: "Error to DELETE a project - status 500",
      });
    });
});

//GET- getProjectActions(id)

router.get("/:id", function (req, res) {
  const { id } = req.params;

  projectModel
    .getProjectActions(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log("CATCH ERROR  getProjectActions(id):", error);
      res.status(500).json({
        errorMessage:
          "The projects actions information could not be retrieved.",
      });
    });
});

module.exports = router;
