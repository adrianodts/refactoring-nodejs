import express from 'express'
import statement from './statement.js'
import Plays from './plays.js'
import Invoices from './invoices.js'
import Performances from './performances.js'

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