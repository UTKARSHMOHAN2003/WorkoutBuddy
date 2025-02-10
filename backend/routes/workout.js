const express = require('express');
const { createWorkout, getAllWorkouts, getSingleWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutControler');
const router = express.Router();

// get all workout
router.get('/',getAllWorkouts );                       
// get a single  workout
router.get('/:id', getSingleWorkout)
// create a new workout
router.post('/', createWorkout);
// update a single workout
router.patch('/:id',updateWorkout)
// delete a single workout
router.delete('/:id',deleteWorkout)

module.exports = router;
