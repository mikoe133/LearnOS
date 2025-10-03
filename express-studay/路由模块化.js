const express = require('express')
const app = express()
const port = 3000
const homerouter = require('./routes/homerouter')
app.use(homerouter)
app.get('/abc', (req, res) => {
    res.send('abc页')
})
app.all('*', (req, res) => {
    res.send('<h1>404 not found</h1>')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))