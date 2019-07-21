const express = require("express");
const Goal = require("../models/Goals");
const router = express.Router();
const auth = require('../middleware/auth');


// REGISTER USER GOALS
router.post("/register/:id", (req, res) => {
  const {username} = req.body
  const newGoal = new Goal({
    _id: req.params.id,
    user: username
  })
  newGoal.save()
  .then(goalList => res.json(goalList))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

// GET GOALS
router.get("/:id", auth, (req, res) => { 
   Goal.findById(req.params.id).sort({ raceDay: 1 })
    .then(goals => res.json(goals))
    .catch(err => res.json(`ERROR: ${err}`))
    
});

//ADD GOAL
router.post("/add", (req, res) => {
  const {
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnits,
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
    distUnits,
    goalType,
    completed
  };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.unshift(newGoal);
      goalList.save()
        .then(goalList => res.json(goalList.Goals[0]))
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// DELETE GOAL
router.delete("/:userGoalsID/goal/:goalID", (req, res) => {
  Goal.findById(req.params.userGoalsID)
    .then(goalList => {
      goalList.Goals.pull(req.params.goalID);
      goalList.save().then(goalList => res.json(goalList));
    })
    .catch(err => res.status(400).json("Error: " + err));
});


// UPDATE GOAL
router.patch("/goal/:goalID", (req, res) => {

  const {
    userGoalsID,
    name,
    targetPace,
    goalDist,
    raceDay,
    goalType,
    newProgress
  } = req.body;
  Goal.findById(userGoalsID)
  .then(goalList => {
      let goal = goalList.Goals.id(req.params.goalID);
      goal.set({ name, targetPace, goalDist, raceDay, goalType, progress: newProgress})
      goalList.save()
      .then(goalList => res.json(goalList.Goals.id(req.params.goalID)))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});

// COMPLETE GOAL
router.patch("/goal/complete/:goalID", (req, res) => {
  const{userGoalsID, actualPace, mood} = req.body;
  Goal.findById(userGoalsID)
  .then(goalList => {
    let goal = goalList.Goals.id(req.params.goalID);
    goal.set({actualPace, mood, completed: true})
    goalList.save()
    .then(() => res.json(goal))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
})


// ADD RUN
router.post("/addrun", auth, (req, res) => {
  const { userGoalsID, goalID, name, targetPace, runDist, distUnits, date, runType } = req.body;
  if (!name || !targetPace || !runDist) {
    return res
      .status(400)
      .json("Please enter info for name, target pace, and run distance.");
  }
  const newRun = { name, targetPace, runDist, distUnits, runType, date };
  Goal.findById(userGoalsID)
    .then(goalList => {
      goalList.Goals.id(goalID).runs.unshift(newRun);
      goalList.save().then(goalList => res.json(goalList.Goals.id(goalID).runs[0]));
    })
    .catch(err => res.json("ERRORs: " + err));
});

// DELETE RUN
router.delete("/:userID/goal/:goalID/runs/:runID", auth, (req, res) => {
  Goal.findById(req.params.userID)
    .then(goalList => {
      goalList.Goals.id(req.params.goalID).runs.pull(req.params.runID);
      goalList.save().then(goal => res.json(goal.Goals.id(req.params.goalID)));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// UPDATE RUN
router.patch("/runs/:runID", auth, (req, res) => {
  const {
    userGoalsID,
    goalID,
    name,
    targetPace,
    runDist,
    date,
    actualPace,
    runType,
    mood,
    progress
  } = req.body;
  Goal.findById(userGoalsID)
  .then(goalList => {
      let goal = goalList.Goals.id(goalID);
      goal.set({progress})
      let run = goal.runs.id(req.params.runID);
      run.set({ name, targetPace, runDist, date, runType, actualPace, mood })
      goalList.save()
      .then(goalList => res.json(goalList.Goals.id(goalID).runs.id(req.params.runID)))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});

// COMPLETE RUN
router.patch("/run/complete/:runID", auth, (req, res) => {
  const {userGoalsID, goalID, mood, actualPace, progress} = req.body;
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
