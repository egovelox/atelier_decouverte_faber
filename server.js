// CONFIG
const express = require('express')
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(express.json()) // if needed, can parse application/json bodies
app.use(express.urlencoded({ extended: true }))
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'))


// DECLARE ROUTES
app.get('/atelier/health', (req, res) => {
  res.json({health:"ok"}) 
})


const warning = "Login failed, please retry or contact our support team &#128533;"
const loginPage = (isFailure) => 
`
  <h1>Login</h1>
  <input id='name'></input>
  <button id='login'>Go!</button>
  <p id='warning'>${isFailure ? warning : ""}</p>
  <script type="text/javascript">
    const button = document.querySelector("#login")

    button.addEventListener("click", () => {
      const name = document.querySelector("#name").value.trim() 

      if (name.length < 2 || name.length > 30) {
        const warning = document.querySelector("#warning")
        warning.innerHTML = 'Enter a correct name &#128540; !'
      } else {
        window.location.href = "greet/" + name
      }
    })
  </script>
`
app.get('/atelier/login', (req, res) => {
 const failure = req.query.failure === "true" ? true : false
 res.send(loginPage(failure))
})


const users = ["Max"]
app.get('/atelier/greet/:name', (req, res) => {
  const name = req.params.name
  if (users.includes(name)) {
    res.json({greet: "hello " + name + "!"}) 
  } else {
    res.redirect("/atelier/login?failure=true")
  }
})


// RUN SERVER
app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT)
})
