//Node express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

// //The Model
var Work = require('./work-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

// mongodb+srv://admin:pass@cluster0.yx8a4.mongodb.net/Portfolio?retryWrites=true&w=majority

//setup routes
var router = express.Router();
 
router.get('/testing', (req, res) => {
  res.send('<h1>Testing</h1>')
})

//====================Work Routes=========================

router.get('/portfolio', (req, res) => {
  Work.find()
  .then((works)=>{
    res.json(works);
  })
})

router.get('/portfolio/:id', (req, res) => {
  Work.findOne({id:req.params.id})
  .then((works)=>{
    res.json(works);
  })
})

router.post('/portfolio', (req, res) => {
  var work = new Work()
  work.id = Date.now()

  var data = req.body
  console.log(data)
  Object.assign(work, data)
  work.save()
  .then((work)=>{
    res.json(work)
  })
})

router.put('/portfolio/:id', (req, res) => {
  Work.findOne({id:req.params.id})
  .then((work) => {
      var data = req.body
      Object.assign(work,data)
      return work.save()   
  })
  .then((work) => {
       res.json(work)
  })
})

router.delete('/portfolio/:id', (req, res) => {
  Work.deleteOne({ id: req.params.id })
  .then(() => {
      res.json('deleted');
  })
  
})

//use server to serve up routes
app.use('/api', router);
 
// launch our backend into a port
const apiPort = 3002;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));

// //setup database connection
var connectionString = 'mongodb+srv://admin:pass@cluster0.yx8a4.mongodb.net/Portfolio?retryWrites=true&w=majority'
mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))