import uuid from "uuid";

export const initialState = {
  goals: {
    currentGoal: {
        id: uuid(),
        name: "Orca Half Marathon",
        raceDay: "09/22/19",
        targetPace: "8:45",
        goalDist: 13.1,
        goalType: "Half-Marathon",
        runs: [
          {
            id: uuid(),
            name: "run #1",
            date: "07/08/19",
            targetPace: "7:12",
            distance: 5.0,
            type: "long distance",
            actualPace: 0,
            completed: false,
            mood: 2
          },
          {
            id: uuid(),
            name: "run #2",
            date: "07/09/19",
            targetPace: "8:15",
            distance: 5.0,
            type: "long distance",
            actualPace: "8:25",
            completed: true,
            mood: 4
          },
          {
            id: uuid(),
            name: "run #3",
            date: "07/10/19",
            targetPace: "6:45",
            distance: 15.0,
            type: "long distance",
            actualPace: "6:50",
            completed: true,
            mood: 3
          }
        ],
        complete: false
    },
    pastGoals: [
      {
        id: uuid(),
        name: "Colorado Steamboat Relay",
        raceDay: "09/12/18",
        targetPace: "9:30",
        goalDist: 256.2,
        goalType: "Relay",
        runs: [
          {
            id: uuid(),
            name: "run #1",
            date: "07/08/18",
            targetPace: "8:45",
            distance: 5.0,
            type: "long distance",
            actualPace: "6:12",
            completed: true,
            mood: 2
          },
          {
            id: uuid(),
            name: "run #2",
            date: "07/09/18",
            targetPace: "8:45",
            distance: 5.0,
            type: "long distance",
            actualPace: "7:35",
            completed: true,
            mood: 4
          },
          {
            id: uuid(),
            name: "run #3",
            date: "07/10/18",
            targetPace: "8:45",
            distance: 17.0,
            type: "long distance",
            actualPace: "6:54",
            completed: true,
            mood: 3
          }
        ],
        completed: true
      }
    ],
    distUnits: "mi"
  }
};
