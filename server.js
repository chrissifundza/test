const express = require ('express');
const axios = require('axios')
const app = express();
app.listen(process.env.PORT||5000);

app.use(express.static("public"));

//request from body data
app.use(express.urlencoded({extended:true}))

//request from api/ fetch
app.use(express.json())
app.set("view engine", 'ejs')

app.get('/pay', (req, res)=>{
    console.log("here");
    res.render('index', {text:"World"})
})

app.post('/pay',(req, res)=>{

    

    const SECRET_KEY = 'sk_live_6da47bff0e314Ykf8ba4522b6a48'

axios.post(
  'https://online.yoco.com/v1/charges/',
  {
    token: req.body.token,
    amountInCents: 599,
    currency: 'ZAR',
  },
  {
    headers: {
      'X-Auth-Secret-Key': SECRET_KEY,
    },
  },
)
.then(respond => {
  // res.status will contain the HTTP status code
  // res.data will contain the response body
res.send(respond.data)
})
.catch(error => {
  // handle errors
  res.send(error.response.data)
})
})

// Anonymous test key. Replace with your key.