const express = require("express");

//import the data base
const actionModel = require("../data/helpers/actionModel.js");

//import router from express
const router = express.Router();

router.use(express.json()); //middleware JSON

//----ENDPOINTS start here:

//--GET actions
// router.get("/", function (req, res) {
//   const { id } = req.params;
//   actionModel
//     .get(id)
//     .then((actions) => {
//       res.status(200).json(actions);
//     })
//     .catch(res.status(500).json({ errorMessage: "Error to find actions" }));
// });

router.get("/", (req, res) => {
  actionModel
    .get(req.params.id)
    .then((action) => {
      if (action.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
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
module.exports = router;
