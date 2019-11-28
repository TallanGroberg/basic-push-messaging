const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const webPush = require('web-push')
const path = require('path')

app.use(express.static(path.join(__dirname, 'client')))
app.use(morgan('dev'))
app.use(bodyParser.json())

webPush.setVapidDetails('mailto:tallan.taven@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

app.post('/subscribe', (req,res) => {
  //get push subscrp object 
  const subscription = req.body
  console.log(req.body)
  // send 201
  res.status(201).json({})
  const payload = JSON.stringify({title: 'push test', })

  //pass object to send notification
  webPush.sendNotification( subscription, payload)
    .catch(err => console.error(err))
})



app.listen(4441, () => {
  console.log('app is love on 4441')
})