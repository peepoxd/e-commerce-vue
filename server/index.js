const express = require('express')
const bodyparser = require('body-parser')

const mysql = require('mysql2/promise')
const Pool = require('pg').Pool


const cors = require('cors')
const dotenv = require('dotenv')


const app = express()
const port = 8000

const conn = null

app.use(bodyparser.json())
app.use(cors())
dotenv.config()

const initMySQL = () => {
    conn =  new Pool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT
    })
}

app.listen(port, async (req, res) => {
    try{
        await initMySQL()
        console.log('http server run on : ' + port)
    }catch(error){
        console.log('error', error)
    }
})

app.get('/', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.send(results[0])
})

app.post('/user', async (req, res) => {
    try {
        let user = req.body
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: ' Insert OK',
            data: results[0]
        })
    } catch (error) {
        console.log('error message', error.message)
        res.status(500).json({
            message: 'somthing wrong'
        })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'Not Found' }
        }
        res.json(results[0][0])

    } catch (error) {
        console.log('error message', error.message, error.statusCode)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'somthing wrong',
            eerorMassage: error.message
        })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updateUser = req.body
        const results = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateUser, id]
        )
        console.log(id,updateUser,results[0])
        
        res.json({
            message: ' Update OK',
            data: results[0][0]
        })
    } catch (error) {
        console.log('error message', error.message, error.statusCode)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'somthing wrong',
            eerorMassage: error.message
        })
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query(
            'Delete FROM users WHERE id = ?',
            id
        )
        console.log(id,results[0])
        
        res.json({
            message: ' Delete OK',
            data: results[0][0]
        })
    } catch (error) {
        console.log('error message', error.message, error.statusCode)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'somthing wrong',
            eerorMassage: error.message
        })
    }
})


