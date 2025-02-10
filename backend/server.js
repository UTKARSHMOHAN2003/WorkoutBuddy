require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const WorkoutRoutes = require('./routes/workout');
const cors = require('cors');


//express app
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: "*", // Allow requests from any domain
    methods: "GET,POST,PATCH,DELETE",
    credentials: true
}));

//middleware
app.use(express.json())
app.use((req,res,next)=>{
console.log(req.path,req.method)
next()
})



//routes 
app.use('/api/workouts',WorkoutRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => console.log('listening on port 4000 '));
})
.catch((error) => console.log(error));


