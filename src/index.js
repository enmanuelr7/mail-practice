const express = require('express')
const app = express()

app.use(express.json())

app.post('/', (req, res) => {
    res.send(`hello ${req.body.name}`)
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})