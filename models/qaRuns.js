const mongoose = require('mongoose');
const { Schema } = mongoose;


const qaRuns = new Schema({
 tasks: { type: Array, default: [] },
 timestamp: { type: Date, default: Date.now }
});

mongoose.model('qaRuns', qaRuns);
