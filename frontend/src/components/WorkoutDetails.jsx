import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkout, updateWorkoutTitle } from '../features/workoutSlice';

function WorkoutDetails({ workoutprops }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(workoutprops.title);

    // Handle delete
    const handleDelete = () => {
        dispatch(deleteWorkout(workoutprops._id));
    };

    // Handle update
    const handleUpdate = () => {
        if (newTitle.trim()) {
            dispatch(updateWorkoutTitle({ id: workoutprops._id, newTitle }));
            setIsEditing(false);
        }
    };

    return (
        <div className="workout-card">
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            ) : (
                <h4>{workoutprops.title}</h4>
            )}
            
            <p><strong>Load (kg):</strong> {workoutprops.load}</p>
            <p><strong>Reps:</strong> {workoutprops.reps}</p>

            {isEditing ? (
                <button onClick={handleUpdate}>Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}

            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default WorkoutDetails;
