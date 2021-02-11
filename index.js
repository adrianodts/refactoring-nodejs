const express = require('express')
const statement = require('./statement')
const Plays = require('./plays')
const Invoices = require('./invoices')
const Performances = require('./performances')

const app = express()


const hamlet = new Plays('hamlet', 'Hamlet', 'tragedy')
const aslike = new Plays('as-like', 'As You Like It', 'comedy')
const othello = new Plays('othello', 'Othello', 'tragedy')

const plays = [hamlet, aslike, othello]

const performances = [
    new Performances(hamlet.playID, 55), 
    new Performances(aslike.playID, 35),
    new Performances(othello.playID, 40)
]

const invoice = new Invoices("BigCo", performances)

const result = statement(invoice, plays)
console.log(result)

app.listen(3000, ()=> console.log('Express iniciado na porta: 3000'))