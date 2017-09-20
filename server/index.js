const express = require('express')
const { port = 3333 } = require('minimist')(process.argv)
const cors = require('cors')

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
}

var game = {
    hasStarted: false,
    players: [],
    host: '',
    numOfWerewolves: 0,
    numOfVillagers: 0,
    numOfProphet: 1,
    numOfWitch: 1,
    numOfGuard: 0,
    numOfCupid: 0,
    numberOfRoles: 0,
    roles: []    
}

const doesPlayerExist = (name) => {
    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].name === name) {
            return true
        }
    }
    return false
}

const getRoleForPlayer = (name) => {
    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].name === name) {
            return game.players[i].role
        }
    }
    return 'undefined'
}

const app = express()
    .use(logger)
    .use(cors())
    .use('/', express.static('./dist/img'))
    .get('/host/:name&:wolves:villagers:prophet:witch:guard:cupid', (req, res) => {
        game.host = req.params.name
        console.log(req.params.name + ' has started hosting the game')

        game.numOfWerewolves = parseInt(req.params.wolves)
        game.numOfVillagers = parseInt(req.params.villagers)
        game.numOfProphet = parseInt(req.params.prophet)
        game.numOfWitch = parseInt(req.params.witch)        
        game.numOfGuard = parseInt(req.params.guard)
        game.numOfCupid = parseInt(req.params.cupid)

        console.log('number of werevolves', game.numOfWerewolves)
        console.log('number of villagers', game.numOfVillagers)
        console.log('number of prophet', game.numOfProphet)
        console.log('number of witch', game.numOfWitch)        
        console.log('number of guard', game.numOfGuard)
        console.log('number of cupid', game.numOfCupid)

        game.numberOfRoles = game.numOfWerewolves +
        game.numOfVillagers +
        game.numOfProphet +
        game.numOfWitch +
        game.numOfGuard +
        game.numOfCupid

        // populate roles
        var i
        for (i = 0; i < game.numOfWerewolves; i++) {
            game.roles.push('werewolf')
        }
        for (i = 0; i < game.numOfVillagers; i++) {
            game.roles.push('villager')
        }
        for (i = 0; i < game.numOfProphet; i++) {
            game.roles.push('prophet')
        }
        for (i = 0; i < game.numOfWitch; i++) {
            game.roles.push('witch')
        }
        for (i = 0; i < game.numOfGuard; i++) {
            game.roles.push('guard')
        }
        for (i = 0; i < game.numOfCupid; i++) {
            game.roles.push('cupid')
        }
    })
    .get('/join/:name', (req, res) => {
        const playerName = req.params.name
        if (!doesPlayerExist(playerName)) {
            game.players.push({
                name: playerName,
                role: ''
            })
            console.log(playerName + ' has joined')
        } else {
            console.log(playerName + ' has returned to the game')
        }
    })
    .get('/view/:name', (req, res) => {
        if (game.hasStarted) {
            const role = getRoleForPlayer(req.params.name)
            res.status(200).json({
                game,
                role
            })
        } else {
            res.status(200).json({
                game
            })
        }
    })
    .get('/start', (req, res) => {
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })
        game.roles.sort(function (a, b) { return 0.5 - Math.random() })

        var i
        for (i = 0; i < game.roles.length; i++) {
            game.players[i].role = game.roles[i]
        }

        console.log("players", game.players)  
        
        game.hasStarted = true

        res.status(200).json({
            game
        })
    })
    .get('/exit/:name', (req, res) => {
        var i
        for (i = 0; i < game.players.length; i++) {
            if (game.players[i].name === req.params.name) {
                game.players.pop(req.params.name)
                console.log(req.params.name + ' has exited')
            }
        }
    })
    .get('/test', (req, res) => {
        game.players = [
            {
                name: 'felix',
                role: ''
            },
            {
                name: 'sasa',
                role: ''
            },
            {
                name: 'neil',
                role: ''
            },
            {
                name: 'damon',
                role: ''
            },
            {
                name: 'april',
                role: ''
            },
            {
                name: 'david',
                role: ''
            },
            {
                name: 'chris',
                role: ''
            },
            {
                name: 'sonny',
                role: ''
            },
            {
                name: 'boya',
                role: ''
            }        
        ]
    })


app.listen(port, () => console.log('Werewolf server running on port ' + port))