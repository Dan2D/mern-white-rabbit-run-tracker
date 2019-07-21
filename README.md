# mern-white-rabbit-run-tracker
This is a full stack MERN (Mongo DB, Express, React.js, Node.js) app that provides users with a nice interface
to keep track of their runs and running goals they set for themselves.

I'm currently training for a half marathon and wanted to make a run-tracker app to help me keep track of my running goals
and how I felt I was doing and thought this would be a fun project.

## Log in / Registration
Anyone can create a new user login to keep track of their runs. Users will be initially directed to log in or register if they
have not created a log in yet. The site will perform validations with the user log in to meet certain security requirements,
provide valid email address, check if user already exists in the system, etc

## Goals
Users will be able to create goals and track their runs in the process of completing goals.
Goals consist of a Name, Date, Target Pace, Distance, and Type.
As users complete runs, their current goal progress will update giving them a percentage of how far they are to completing
their goal (visualized by a white rabbit making its way towards a labeled tree).
Once users complete their goals, they can input their Actual Pace and a Rating of how they felt.

## Runs
Users are able to schedule upcoming runs and view runs they've completed.
Runs are similar to goals in that they consist of Name, Date, Target Pace, Distance, and Type.
Upon completing a run users will be able to input their Actual Pace and Rate their run.

## Stats
As users complete runs and goals their statistics will be tracked in the stats tab.
A current goal stats will show the user's statistics relating to the current goal they're working on, including 
Longest Run, Fastest Mile, Completed Runs, and Total Distance.
All goals, including current and past, will be shown on the stats page.
Clicking on the goals will take the user to that goals stats detail page which will show all runs and stats for that goal.
OverallStats are also available which show statistics for all completed runs and goals.

## Settings
Users can set their preferred distance units to either miles or kilometers and all runs and goals will update automatically
including distance and converted pace times.

Feel free to message me if you run into any problems

-Dan
