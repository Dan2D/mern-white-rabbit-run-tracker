const express = require("express");
const Goal = require("../models/Goals");
const router = express.Router();

// Get userGoals
router.get("/:id", async (req, res) => {
  try {
    const goals = await Goal.id(req.params.id).sort({ raceDay: 1 });
    res.json(goals);
  } catch (err) {
    res.json({ message: err });
  }
});

// Add Goal
router.post("/add", (req, res) => {
  const {
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    goalType,
    completed
  } = req.body;

  if (!name || !targetPace || !goalDist) {
    return res
      .status(400)
      .json("Please enter info for name, target pace, and goal distance.");
  }

  const newGoal = {
    name,
    raceDay,
    targetPace,
    goalDist,
    goalType,
    completed
  };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.unshift(newGoal);
      goalList
        .save()
        .then(goalList => res.json(goalList))
        .then(goalList => console.log(goalList));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Delete Goal
router.delete("/goal/:goalID", (req, res) => {
  const { userGoalsID } = req.body;
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.pull(req.params.goalID);
      goalList.save().then(goalList => res.json(goalList));
    })
    .catch(err => res.status(400).json("Error: " + err));
});


// Update Goal
router.patch("/goal/:goalID", (req, res) => {
  const {
    userGoalsID,
    name,
    targetPace,
    goalDist,
    raceDay,
    goalType,
  } = req.body;

  Goal.findById(userGoalsID)
  .then(goalList => {
      let goal = goalList.Goals.id(req.params.goalID);
      goal.set({ name, targetPace, goalDist, raceDay, goalType})
      goalList.save()
      .then(goal => res.json(goal))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});




// fuzzy comparator (2 equals) b/c mongo shows _id as Object and mongoose as string
// Add Run to specific goal
router.post("/add-run", (req, res) => {
  const { userGoalsID, goalID, name, targetPace, distance } = req.body;
  if (!name || !targetPace || !distance) {
    return res
      .status(400)
      .json("Please enter info for name, target pace, and run distance.");
  }
  const newRun = { name, targetPace, distance };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.id(goalID).runs.unshift(newRun);
      goalList.save().then(goalList => res.json(goalList));
    })
    .catch(err => res.json("ERROR: " + err));
});

// Delete Specific Run from Specific Goal
router.delete("/runs/:runID", (req, res) => {
  const { userGoalsID, goalID } = req.body;
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.id(goalID).runs.pull(req.params.runID);
      goalList.save().then(goal => res.json(goal));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update Run
router.patch("/runs/:runID", (req, res) => {
  const {
    userGoalsID,
    goalID,
    name,
    targetPace,
    distance,
    date,
    actualPace,
    type,
    mood
  } = req.body;

  Goal.findById(userGoalsID)
  .then(goalList => {
      let run = goalList.Goals.id(goalID).runs.id(req.params.runID)
      run.set({ name, targetPace, distance, date, type, actualPace, mood })
      goalList.save()
      .then(run => res.json(run))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});

module.exports = router;
