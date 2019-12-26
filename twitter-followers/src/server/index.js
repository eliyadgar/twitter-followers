const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 4000

const requestOptions = {
  headers: {
    "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAL3K9gAAAAAAIrS%2Fp6hWRNY44bbEMZ0lDCTnvA8%3DhUumENPIyTgjkXN029M2mE3ZOYMRTRMWm7W0Y5ueYepqaiKsnN"
  },
};

app.get('/api/followers', (req, res) => {
  fetch(`https://api.twitter.com/1.1/followers/list.json?cursor=${req.query.cursor}&count=${req.query.count}&screen_name=${req.query.screen_name}`, requestOptions)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(error => {
      console.log('error', error)
      res.status(500)
    });
})

app.get('/api/account/:id/', (req, res) => {
  console.log(req.params.id)
  
  fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=${req.params.id}`, requestOptions)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(error => {
      console.log('error', error)
      res.status(500)
    });
})

// app.get('/api/followers/:id', (req, res) => {
//   console.log(req.params.id)
//   fetch(`https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=${req.params.id}&skip_status=true&include_user_entities=false`, requestOptions)
//     .then(response => response.json())
//     .then(result => res.json(result))
//     .catch(error => {
//       console.log('error', error)
//       res.status(500)
//     });
// })


app.listen(port, () => console.log(`app listening on port ${port}!`))