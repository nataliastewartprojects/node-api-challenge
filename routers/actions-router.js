const express = require("express");

//import the data base
const actionModel = require("../data/helpers/actionModel.js");
const projectModel = require("../data/helpers/projectModel");

//import router from express
const router = express.Router();

router.use(express.json()); //middleware JSON

//----ENDPOINTS start here:

//--GET actions

router.get("/", (req, res) => {
  const projectID = req.params.id;

  actionModel
    .get(projectID)
    .then((action) => {
      if (action.length === 0) {
        res.status(404).json({
          message: "The project with the specified ID does not have actions.",
        });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((error) => {
      console.log(error, "status 500");
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

//--POST action
router.post("/", (req, res) => {
  actionModel
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log("POST CATCH ERROR", error);
      res.status(500).json({
        error: "There was an error while saving the project to the database",
      });
    });
});

//--PUT - UPDATE - ACTION
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;

  actionModel.update(id, updatedAction).then((item) => {
    if (item.id == id) {
      res.status(201).json({ ...updatedAction });
    } else {
      res.status(500).json({ error: "The action could not be updated" });
    }
  });
});

//--REMOVE-DELETE - Action
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  actionModel.remove(id).then((item) => {
    if (item == item > 0) {
      res.status(200).json({ message: `The ACTION ${id} has been deleted` });
    } else {
      res.status(500).json({
        message: "Error removing the ACTION",
      });
    }
  });
});

module.exports = router;
