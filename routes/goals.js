const express = require("express");
const Goal = require("../models/Goals");
const router = express.Router();
const auth = require('../middleware/auth');


// Register New user goals 
router.post("/register/:id", (req, res) => {
  console.log("NEW GOAL NEW USER")
  const {username} = req.body
  const newGoal = new Goal({
    _id: req.params.id,
    user: username
  })
  console.log(newGoal)
  newGoal.save()
  .then(goalList => res.json(goalList))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

// Get userGoals (WORKING)
router.get("/:id", auth, (req, res) => { 
   Goal.findById(req.params.id).sort({ raceDay: 1 })
    .then(goals => res.json(goals))
    .catch(err => res.json(`ERROR: ${err}`))
    
});

// Add Goal (WORKING)
router.post("/add", (req, res) => {
  const {
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnit,
    goalType,
    completed
  } = req.body;
  console.log(req.body)
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
    distUnit,
    goalType,
    completed
  };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.unshift(newGoal);
      console.log(goalList.Goals[0])
      goalList.save()
        .then(goalList => res.json(goalList.Goals[0]))
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Delete Goal (WORKING)
router.delete("/:userGoalsID/goal/:goalID", (req, res) => {
  Goal.findById(req.params.userGoalsID)
    .then(goalList => {
      goalList.Goals.pull(req.params.goalID);
      goalList.save().then(goalList => res.json(goalList));
    })
    .catch(err => res.status(400).json("Error: " + err));
});


// Update Goal (WORKING)
router.patch("/goal/:goalID", (req, res) => {
  const {
    userGoalsID,
    name,
    targetPace,
    goalDist,
    distUnit,
    raceDay,
    goalType,
  } = req.body;
  console.log(req.body)
  Goal.findById(userGoalsID)
  .then(goalList => {
      let goal = goalList.Goals.id(req.params.goalID);
      goal.set({ name, targetPace, goalDist, distUnit, raceDay, goalType})
      goalList.save()
      .then(goalList => res.json(goalList.Goals.id(req.params.goalID)))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});

// Complete Goal
router.patch("/goal/complete/:goalID", (req, res) => {
  const{userGoalsID, actualPace, mood} = req.body;
  console.log(req.body)
  Goal.findById(userGoalsID)
  .then(goalList => {
    let goal = goalList.Goals.id(req.params.goalID);
    goal.set({actualPace, mood, completed: true})
    goalList.save()
    .then(() => res.json(goal))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
})


// Add Run to specific goal (WORKING)
router.post("/addrun", auth, (req, res) => {
  const { userGoalsID, goalID, name, targetPace, distance, distUnit, date, type } = req.body;
  console.log(goalID, userGoalsID)
  if (!name || !targetPace || !distance) {
    return res
      .status(400)
      .json("Please enter info for name, target pace, and run distance.");
  }
  const newRun = { name, targetPace, distance, distUnit, type, date };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.id(goalID).runs.unshift(newRun);
      goalList.save().then(goalList => res.json(goalList.Goals.id(goalID).runs[0]));
    })
    .catch(err => res.json("ERRORs: " + err));
});

// Delete Specific Run from Specific Goal (WORKING)
router.delete("/:userID/goal/:goalID/runs/:runID", auth, (req, res) => {
  Goal.findById(req.params.userID)
    .then(goalList => {
      goalList.Goals.id(req.params.goalID).runs.pull(req.params.runID);
      goalList.save().then(goal => res.json(goal.Goals.id(req.params.goalID)));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update Run (WORKING)
router.patch("/runs/:runID", auth, (req, res) => {
  const {
    userGoalsID,
    goalID,
    name,
    targetPace,
    distance,
    distUnit,
    date,
    actualPace,
    type,
    mood
  } = req.body;
  console.log(req.body);
  Goal.findById(userGoalsID)
  .then(goalList => {
      let run = goalList.Goals.id(goalID).runs.id(req.params.runID)
      run.set({ name, targetPace, distance, distUnit, date, type, actualPace, mood })
      goalList.save()
      .then(goalList => res.json(goalList.Goals.id(goalID).runs.id(req.params.runID)))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});

// COMPLETE RUN
router.patch("/run/complete/:runID", auth, (req, res) => {
  const {userGoalsID, goalID, mood, actualPace, progress} = req.body;
  console.log(req.body)
  Goal.findById(userGoalsID)
  .then(goalList => {
    let goal = goalList.Goals.id(goalID)
    let run = goal.runs.id(req.params.runID);
    goal.set({progress: progress})
    run.set({completed: true, mood, actualPace})
    goalList.save()
    .then(() => res.json(run))
  })
  .catch(err => res.status(400).json(`Error: ${err}`))
}
)

module.exports = router;
