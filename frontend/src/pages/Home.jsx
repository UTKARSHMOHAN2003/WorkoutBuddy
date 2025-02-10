import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../features/workoutSlice';

function Home() {
    const dispatch = useDispatch();
    const { items: workouts, loading, error } = useSelector((state) => state.workouts);

    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div>
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workoutprops={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
