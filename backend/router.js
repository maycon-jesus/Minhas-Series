const dotenv = require("dotenv")
dotenv.config({
    path: './.env'
})

const http = require("http")

const express = require("express")
const app = express()
const cors = require("cors")

const path = require("path")
const fs = require("fs")

function vHost(dominio, app) {
    return function (req, res, next) {
        const host = req.headers.host.split(':')[0]
        if (host.replace('www.') === dominio) {
            app(req, res, next)
        } else {
            next()
        }
    }
}

app.use(cors())
const appAPI = require("./server")
app.use(vHost(`api.${process.env.HOSTNAME}`, appAPI))

const appStatic = express()
app.use(express.static(path.join(__dirname, './dist/frontend')))
app.use((req, res) => {
    fs.readFile(path.join(__dirname, './dist/frontend/index.html'), { encoding: 'utf-8' }, (err, html) => {
        if (err) {
            res.status(500).send('Ocorreu um erro no servidor!')
        } else {
            res.send(html)
        }
    })
})
app.use(vHost(`${process.env.HOSTNAME}`), appStatic)

const server = http.createServer(app).listen(process.env.PORT)
server.on('listening', () => {
    console.log(`Servidor ligado!`)
    console.log(`Para acessar use:`)
    console.log(``)
    console.log(`http://localhost:${process.env.PORT}/`)
    console.log(``)
    console.log(`ou`)
    console.log(``)
    console.log(`http://0.0.0.0:${process.env.PORT}/`)
})