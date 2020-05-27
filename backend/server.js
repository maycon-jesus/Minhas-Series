const express = require("express")
const app = express()
module.exports = app

const fs = require("fs")
const path = require("path")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('API!')
})

app.get('/series', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            let series = JSON.parse(data)
            series.map(serie => {
                serie.episodios = serie.temporadas.reduce((p, temporada) => {
                    return p + temporada.episodios.length
                }, 0)
                serie.temporadas = serie.temporadas.length
                return serie
            })
            res.send(series)
        } else {
            res.status(500).send(err.message)
        }
    })
})

app.get('/series/:id', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const series = JSON.parse(data)
            const serie = series.find(serie => {
                return serie.id == req.params.id
            })
            if (serie) {
                res.send(serie)
            } else {
                res.status(404).send(new Error('Serie não encontrada!').message)
            }
        } else {
            res.status(500).send(err.message)
        }
    })
})

app.delete('/series/:id', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const series = JSON.parse(data)
            const serie = series.find(serie => {
                return serie.id == req.params.id
            })
            if (serie) {
                fs.writeFile(path.join(__dirname, './data/series.json'), JSON.stringify(series.filter(s => s !== serie)), { encoding: 'utf-8' }, (err) => {
                    if (err) return res.status(500).send(err.message)
                    res.send()
                })
            } else {
                res.status(404).send(new Error('Serie não encontrada!').message)
            }
        } else {
            res.status(500).send(err.message)
        }
    })
})

app.post('/series', (req, res) => {
    if (!req.body.nome) return res.status(400).send('Informe o nome da série!')
    if (!req.body.anoInicio) return res.status(400).send('Informe o ano de início da série!')
    if (!req.body.capaURL) return res.status(400).send('Informe a URL da capa da série!')

    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            let series = JSON.parse(data)
            let ID = Date.now()
            series.push({
                "id": ID,
                "nome": req.body.nome,
                "capaURL": req.body.capaURL,
                "anoInicio": req.body.anoInicio,
                "anoFim": req.body.anoFim ? req.body.anoFim : 0,
                "temporadas": []
            })
            fs.writeFile(path.join(__dirname, './data/series.json'), JSON.stringify(series), { encoding: 'utf-8' }, (err) => {
                if (err) return res.status(500).send(err.message)
                res.send()
            })
        } else {
            res.status(500).send(err.message)
        }
    })
})

app.put('/series/:id', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const series = JSON.parse(data)
            const serie = series.find(s => s.id == req.params.id)
            if (serie) {

                const erros = []

                if (req.body.nome) {
                    serie.nome = req.body.nome
                }
                if (req.body.capaURL) {
                    serie.capaURL = req.body.capaURL
                }

                const anoInicio = parseInt(req.body.anoInicio)
                if (anoInicio !== NaN) {
                    if (anoInicio <= 0) erros.push('O ano de lançamento da série deve ser maior que 0!')
                    serie.anoInicio = anoInicio
                }

                const anoFim = parseInt(req.body.anoFim)
                if (anoFim !== NaN) {
                    if (anoFim < 0) erros.push('O ano de lançamento da série deve ser maior que 0!')
                    if (anoFim < anoInicio && anoFim !== 0) erros.push('O ano de encerramento da série deve ser maior ou igual ao de lançamento!')
                    serie.anoFim = anoFim
                }

                if (erros.length > 0) {
                    return res.status(400).send(erros[0])
                }
                fs.writeFile(path.join(__dirname, './data/series.json'), JSON.stringify(series), { encoding: 'utf-8' }, (err) => {
                    if (err) return res.status(500).send(err.message)
                    res.send()
                })
            } else {
                res.status(404).send('Série não encontrada!')
            }

        } else {
            res.status(500).send(err.message)
        }
    })
})

app.put('/series/:id/:temporadaID/', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const series = JSON.parse(data)
            const serie = series.find(s => s.id == req.params.id)
            if (serie) {

                const erros = []

                if (req.body) {
                    if (parseInt(req.body.ano) !== NaN && req.body.ano >= serie.anoInicio) {
                        if (req.body.episodios) {
                            const temporada = {
                                ano: parseInt(req.body.ano),
                                episodios: req.body.episodios.map(e => {
                                    return {
                                        titulo: e.titulo || 'Undefined',
                                        visto: e.visto || false,
                                    }
                                })
                            }
                            if (!serie.temporadas[req.params.temporadaID]) {
                                serie.temporadas.push(temporada)
                            } else {
                                serie.temporadas[req.params.temporadaID] = temporada
                            }
                        } else {
                            erros.push('Informe os episódios!')
                        }
                    } else {
                        erros.push('O ano da temporada é inválido!')
                    }
                }

                if (erros.length > 0) {
                    return res.status(400).send(erros[0])
                }
                fs.writeFile(path.join(__dirname, './data/series.json'), JSON.stringify(series), { encoding: 'utf-8' }, (err) => {
                    if (err) return res.status(500).send(err.message)
                    res.send()
                })
            } else {
                res.status(404).send('Série não encontrada!')
            }

        } else {
            res.status(500).send(err.message)
        }
    })
})

app.delete('/series/:id/:temporadaID/', (req, res) => {
    fs.readFile(path.join(__dirname, './data/series.json'), { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const series = JSON.parse(data)
            const serie = series.find(s => s.id == req.params.id)
            if (serie) {

                serie.temporadas = serie.temporadas.filter((t, i) => i != req.params.temporadaID)

                fs.writeFile(path.join(__dirname, './data/series.json'), JSON.stringify(series), { encoding: 'utf-8' }, (err) => {
                    if (err) return res.status(500).send(err.message)
                    res.send()
                })
            } else {
                res.status(404).send('Série não encontrada!')
            }

        } else {
            res.status(500).send(err.message)
        }
    })
})