let MATCH_TYPE = ''
let PLAYER_1 = ''
let PLAYER_2 = ''
let TEAM_1_PLAYER_1 = ''
let TEAM_1_PLAYER_2 = ''
let TEAM_2_PLAYER_1 = ''
let TEAM_2_PLAYER_2 = ''
let CURRENT_STATE = 0
let LAST_SERVE_TEAM = '1'

window.onload = function() {
    console.log('match.js loaded')
    const url = new URL(window.location.href)
    const params = url.searchParams
    MATCH_TYPE = params.get('match_type')
    console.log('match type:', MATCH_TYPE)

    if (MATCH_TYPE === 'singles') {
        PLAYER_1 = params.get('player_1') || ''
        PLAYER_2 = params.get('player_2') || ''
        console.log('player 1: ', PLAYER_1)
        console.log('player 2: ', PLAYER_2)

        const player1Element = document.getElementById('team_1_player_right')
        const player2Element = document.getElementById('team_2_player_right')
        player1Element.textContent = PLAYER_1
        player2Element.textContent = PLAYER_2
    } else {
        TEAM_1_PLAYER_1 = params.get('team_1_player_1') || ''
        TEAM_1_PLAYER_2 = params.get('team_1_player_2') || ''
        TEAM_2_PLAYER_1 = params.get('team_2_player_1') || ''
        TEAM_2_PLAYER_2 = params.get('team_2_player_2') || ''
        console.log('team 1 player 1: ', TEAM_1_PLAYER_1)
        console.log('team 1 player 2: ', TEAM_1_PLAYER_2)
        console.log('team 2 player 1: ', TEAM_2_PLAYER_1)
        console.log('team 2 player 2: ', TEAM_2_PLAYER_2)

        const team1Player1Element = document.getElementById('team_1_player_left')
        const team1Player2Element = document.getElementById('team_1_player_right')
        const team2Player1Element = document.getElementById('team_2_player_right')
        const team2Player2Element = document.getElementById('team_2_player_left')
        team1Player1Element.textContent = TEAM_1_PLAYER_1
        team1Player2Element.textContent = TEAM_1_PLAYER_2
        team2Player1Element.textContent = TEAM_2_PLAYER_1
        team2Player2Element.textContent = TEAM_2_PLAYER_2
    }

    syncSignBadgeState()
}

function addPoint(event) {
    const teamNum = event.currentTarget.id.split('_')[1]
    console.log('add point: team ' + teamNum)

    const score = parseInt(event.currentTarget.textContent, 10)
    const newScore = score + 1
    event.currentTarget.textContent = newScore.toString()
    console.log('new score: ', newScore)

    const opponentTeamNum = teamNum === '1' ? '2' : '1'
    const opponentScoreEle = document.getElementById('team_' + opponentTeamNum + '_score')
    const opponentScore = parseInt(opponentScoreEle.textContent, 10)

    if ((newScore >= 21 && newScore - opponentScore >= 2) || newScore === 30) {
        console.log('game over')
        console.log('winner: team ', teamNum)

        if (teamNum === '1') {
            if (MATCH_TYPE === 'singles') {
                alert(`\u6bd4\u8d5b\u7ed3\u675f\uff0c${PLAYER_1}\u83b7\u80dc\uff01`)
            } else {
                alert(`\u6bd4\u8d5b\u7ed3\u675f\uff0c${TEAM_1_PLAYER_1}/${TEAM_1_PLAYER_2}\u83b7\u80dc\uff01`)
            }
        } else if (MATCH_TYPE === 'singles') {
            alert(`\u6bd4\u8d5b\u7ed3\u675f\uff0c${PLAYER_2}\u83b7\u80dc\uff01`)
        } else {
            alert(`\u6bd4\u8d5b\u7ed3\u675f\uff0c${TEAM_2_PLAYER_1}/${TEAM_2_PLAYER_2}\u83b7\u80dc\uff01`)
        }

        window.history.back()
        return
    }

    if (MATCH_TYPE === 'singles') {
        if ((newScore % 2 === 0 && CURRENT_STATE === 1) || (newScore % 2 === 1 && CURRENT_STATE === 0)) {
            console.log('serve at the other side')
            switchPlayers('1')
            switchPlayers('2')
            CURRENT_STATE = 1 - CURRENT_STATE
        } else {
            console.log('serve at the same side')
        }
    } else {
        if (LAST_SERVE_TEAM === teamNum) {
            switchPlayers(teamNum)
        }
        LAST_SERVE_TEAM = teamNum
        CURRENT_STATE = newScore % 2
    }

    switchServeSign(teamNum)
}

function switchPlayers(teamNum) {
    console.log('switch players: team ' + teamNum)
    const playerLeft = document.getElementById('team_' + teamNum + '_player_left')
    const playerRight = document.getElementById('team_' + teamNum + '_player_right')
    const temp = playerLeft.textContent
    playerLeft.textContent = playerRight.textContent
    playerRight.textContent = temp
}

function switchServeSign(serveTeam) {
    console.log('switch serve sign: team ' + serveTeam)
    const serveSide = CURRENT_STATE === 0 ? 'right' : 'left'
    const serveSideOpposite = CURRENT_STATE === 0 ? 'left' : 'right'
    const serveSign = document.getElementById('team_' + serveTeam + '_sign_' + serveSide)
    const serveSignOpposite = document.getElementById('team_' + serveTeam + '_sign_' + serveSideOpposite)

    const imgServe = document.createElement('img')
    imgServe.src = 'serve.svg'
    imgServe.alt = '\u53d1\u7403\u6807\u8bc6'
    serveSign.replaceChildren(imgServe)
    serveSignOpposite.textContent = ''

    const receiveTeam = serveTeam === '1' ? '2' : '1'
    const receiveSign = document.getElementById('team_' + receiveTeam + '_sign_' + serveSide)
    const receiveSignOpposite = document.getElementById('team_' + receiveTeam + '_sign_' + serveSideOpposite)

    const imgReceive = document.createElement('img')
    imgReceive.src = 'receive.svg'
    imgReceive.alt = '\u63a5\u53d1\u7403\u6807\u8bc6'
    receiveSign.replaceChildren(imgReceive)
    receiveSignOpposite.textContent = ''

    syncSignBadgeState()
}

function syncSignBadgeState() {
    const signBoxes = document.querySelectorAll('.sign')
    signBoxes.forEach((box) => {
        const hasIcon = box.querySelector('img') !== null
        box.classList.toggle('has-icon', hasIcon)
    })
}
