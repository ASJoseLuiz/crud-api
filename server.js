const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const database = require('./queries.js')

// corpo de req json, tornando os dados acessíveis via req.body
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', async (req, res) => {
    res.json({
        info: 'Node.js, Express e PostgreSQL API'
    })
})

//definindo os endPoints
app.get('/users', database.getUsers)
app.get('/users/:id', database.getUserById)
app.post('/users', database.createUser)
app.put('/users/:id', database.updateUser)
app.delete('/users/:id', database.deleteUser)

app.listen(port, () => {
    console.log(`servidor conectado na porta ${port}`)
})