
const express = require('express')
const bodyparser = require('body-parser')

const mysql = require('mysql2/promise')
const client = require('./connection.js')

const cors = require('cors')
const authorData = require('./postJSON.js')

const app = express()
const port = 8000

app.use(bodyparser.json())
app.use(cors())

app.listen(port, (req , res) => {
    try {
        console.log()
        client.connect()
        console.log('http server run on : ' + port)
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/users', async (req, res) => {
    try {
        const results = await client.query(`Select * from users`)
        if (results.rows == null) {
            throw { statusCode: 500, message: 'Somthing wrong'}
        }
        res.send(results.rows)
    } catch (err) {
        console.log('error message :', err.message)
        res.status(statusCode).json({
            errormessage: err.message
        })
    }
})


app.get('/user/:id', async (req, res) => {
    try {
        let insertQuery = `SELECT * FROM users WHERE id = ${req.params.id}`
        const results = await client.query(insertQuery)
        if (results.rows.length == 0) {
            throw { statusCode: 404, message: 'Not found' }
        }
        res.send(results.rows)
    } catch (error) {
        console.log('error message :', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
                message: 'somthing wrong',
                eerorMassage: error.message
            }
        )
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = req.body
        let insertQuery = `INSERT INTO users(id, first_name, last_name, email, birthdate, added) 
                            values(${user.id}, '${user.first_name}', '${user.last_name}', '${user.email}', '${user.birthdate}', '${user.added}')`
        const results = await client.query(insertQuery)
        res.json({
            message: ' Inserted '
        })
    } catch (error) {
        console.log('error message', error.message)
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
        let user = req.body
        let updateQuery = `UPDATE users 
                            SET id =        '${id}',
                            first_name =    '${user.first_name}',
                            last_name =     '${user.last_name}',
                            email =         '${user.email}',
                            birthdate =     '${user.birthdate}',
                            added =         '${user.added}'`

        const results = await client.query(updateQuery)
        
        res.json({
            message: ' Updated',
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
        let insertQuery = `DELETE FROM users WHERE id = ${req.params.id}`
        const results = await client.query(insertQuery)
        res.json({
            message: ' Deleted'
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

/*
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
*/

