import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Workouts
export const fetchWorkouts = createAsyncThunk(
    'workouts/fetchWorkouts',
    async () => {
        const response = await fetch('https://workout-buddy-mocha.vercel.app/api/workouts');
        return await response.json();
    }
);

// Add Workout
export const addWorkout = createAsyncThunk(
    'workouts/addWorkout',
    async (workout) => {
        const response = await fetch('https://workout-buddy-mocha.vercel.app/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Failed to add workout');
        }
        return await response.json();
    }
);

// **Delete Workout**
export const deleteWorkout = createAsyncThunk(
    'workouts/deleteWorkout',
    async (id) => {
        const response = await fetch(`https://workout-buddy-mocha.vercel.app/api/workouts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete workout');
        }
        return id; // Return ID so we can remove it from the Redux store
    }
);

// **Update Workout Title**
export const updateWorkoutTitle = createAsyncThunk(
    'workouts/updateWorkoutTitle',
    async ({ id, newTitle }) => {
        const response = await fetch(`https://workout-buddy-mocha.vercel.app/api/workouts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title: newTitle }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Failed to update workout');
        }
        return await response.json(); // Return updated workout
    }
);

const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addWorkout.fulfilled, (state, action) => {
                state.items.push(action.payload); // Add new workout to state
            })
            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.items = state.items.filter((workout) => workout._id !== action.payload);
            })
            .addCase(updateWorkoutTitle.fulfilled, (state, action) => {
                const index = state.items.findIndex((w) => w._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload; // Update workout title
                }
            });
    }
});

export default workoutSlice.reducer;
