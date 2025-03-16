const express = require('express')
const app = express()
const {generateImage, generateScript} = require('./ai')
const PORT = 8080

//#region GET
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', homePageHandler)
//#endregion

app.listen(PORT)

//#region Handler Functions
function homePageHandler() {
    res.status(200).send('Home Page!')
}
//#endregion