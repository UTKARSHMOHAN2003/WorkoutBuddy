const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
//get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
//create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }catch(err){
    res.status(400).json({error:err.message})
    }
}
//update a single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const { title, reps, load } = req.body
    const workout = await Workout.findByIdAndUpdate({_id:id}, {title, reps, load})
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
//delete a single workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findByIdAndDelete({_id:id})
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)   
}
module.exports = {
    createWorkout,
    getAllWorkouts, 
    getSingleWorkout,  
    updateWorkout,
    deleteWorkout
}