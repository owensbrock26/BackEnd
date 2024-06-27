const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Define the Workout schema
const WorkoutSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    goal: String,
    hear: String,
    username: String,
    password: String,
});

// Define the Workout model
const Workout = mongoose.model('Workout', WorkoutSchema);

// Define routes here
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the workouts API!' });
});

//
// Signup route
//
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('goal', 'Goal is required').not().isEmpty(),
    check('hear', 'Hear is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be "Yes" or "No"').isIn(['Yes', 'No']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the username is already in use
    const existingUser = await Workout.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already in use' });
    }

    // Create a new Workout with the data from the request body
    const workout = new Workout({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        goal: req.body.goal,
        hear: req.body.hear,
        username: req.body.username,
        password: req.body.password,
    });

    // Save the Workout to the database
    try {
        await workout.save();
        res.json({ success: true, message: 'User signed up!' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while saving workout');
    }
});

//
// Login route
//
router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Find the user with the provided username
    const user = await Workout.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the provided password matches the one in the database
    // For simplicity, this example assumes you're storing passwords in plain text
    // In a real application, you should hash passwords before storing them and compare the hashed values
    if (req.body.password !== user.password) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If the username and password are correct, return a success message
    res.json({ message: 'Logged in successfully' });
});



module.exports = router;


/*
if (response.ok) {
        // Store the user's sign-in status in AsyncStorage
        await AsyncStorage.setItem("isSignedIn", "true");
        navigation.navigate('NextScreen');
      } else if (data.message === 'Device banned') {
        Alert.alert('Error', 'This device has been banned from signing in. Please sign up to remove the ban.');
      } else if (data.message === 'Email not found') {
        Alert.alert('Error', 'Email not found');
      } else if (data.message === 'Incorrect password') {
        Alert.alert('Error', 'Incorrect password');
      } else {
        Alert.alert('Error', 'Sign-in failed');
      }


    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

*/



//Code 2 - with sign in
/*
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Define the Workout schema
const WorkoutSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    goal: String,
    hear: String,
    username: String,
    password: String,
});

// Define the Workout model
const Workout = mongoose.model('Workout', WorkoutSchema);

// Define routes here
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the workouts API!' });
});

//
// Signup route
//
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('goal', 'Goal is required').not().isEmpty(),
    check('hear', 'Hear is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new Workout with the data from the request body
    const workout = new Workout({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        goal: req.body.goal,
        hear: req.body.hear,
        username: req.body.username,
        password: req.body.password,
    });

    // Save the Workout to the database
    try {
        await workout.save();
        res.json({ success: true, message: 'User signed up!' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while saving workout');
    }
});

//
// Login route
//
router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Find the user with the provided username
    const user = await Workout.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the provided password matches the one in the database
    // For simplicity, this example assumes you're storing passwords in plain text
    // In a real application, you should hash passwords before storing them and compare the hashed values
    if (req.body.password !== user.password) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If the username and password are correct, return a success message
    res.json({ message: 'Logged in successfully' });
});



module.exports = router;

*/

//code 1 - no sign in
/*
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Define the Workout schema
const WorkoutSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    goal: String,
    hear: String,
    username: String,
    password: String,
});

// Define the Workout model
const Workout = mongoose.model('Workout', WorkoutSchema);

// Define routes here
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the workouts API!' });
});

//
// Signup route
//
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('goal', 'Goal is required').not().isEmpty(),
    check('hear', 'Hear is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new Workout with the data from the request body
    const workout = new Workout({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        goal: req.body.goal,
        hear: req.body.hear,
        username: req.body.username,
        password: req.body.password,
    });

    // Save the Workout to the database
    try {
        await workout.save();
        res.json({ success: true, message: 'User signed up!' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while saving workout');
    }
});


module.exports = router;




*/