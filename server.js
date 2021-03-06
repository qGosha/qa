require('./config/config.js');
require('./models/qaRuns');
require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const Qa = mongoose.model('qaRuns');
app.use(bodyParser.json());

app.post('/api/startQa', async (req, res) => {
  const names = req.body.payload;
  try {
   const results = await axios.get(process.env.workfrontUrl, {
     params: {
      username: process.env.workfrontLogin,
      password: process.env.workfrontPassword,
      fields: '*',
      teamID: process.env.teamId,
      status: 'IQA',
      plannedCompletionDate: new Date(new Date().setDate(8)),
      assignedToID_Mod: 'isnull'
     }
   });
   if (results.data) {
     await new Qa({ tasks: results.data.data, names: req.body }).save();
     return res.send({
       success: true,
       results: results.data.data
     })
   } else {
     return res.send({
       success: true,
       results: []
     })
   }
 } catch (error) {
   res.send({
     success: false,
     error: error || error.message
   })
 }
});

// app.get('/test', async (req, res) => {
//   var data = ['Kate', 'Igor'];
//   var options = {
//      'method' : 'post',
//      'contentType': 'application/json',
//      'payload' : JSON.stringify(data)
//     }
//
//    await axios.post('http://localhost:5000/api/startQa', options);
// })

app.listen(port, () => {
  console.log('started on', port);
})
