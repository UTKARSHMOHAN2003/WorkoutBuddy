import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../features/workoutSlice'; // Import Redux action

function WorkoutForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const workout = { title, load, reps };

        // Dispatch action to Redux (handles API call inside slice)
        try {
            await dispatch(addWorkout(workout)).unwrap(); // Unwrap to catch errors properly
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to add workout');
        }
    };

    return (
        <div className='workout-form'>
            <form className='create' onSubmit={handleSubmit}>
                <h3> Add a new Workout</h3>

                <label>Title</label>
                <input 
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                />

                <label>Load</label>
                <input 
                    type="number" 
                    onChange={(e) => setLoad(e.target.value)} 
                    value={load}
                />

                <label>Reps</label>
                <input 
                    type="number" 
                    onChange={(e) => setReps(e.target.value)} 
                    value={reps}
                />

                <button type='submit'> Add Workout</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}

export default WorkoutForm;
