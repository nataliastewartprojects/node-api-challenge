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
module.exports = router;
