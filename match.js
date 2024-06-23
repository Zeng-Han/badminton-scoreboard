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
    // load the parameters from the URL
    let url = new URL(window.location.href)
    let params = url.searchParams
    MATCH_TYPE = params.get('match_type')
    console.log('match type:', MATCH_TYPE)
    if (MATCH_TYPE === 'singles') {
        PLAYER_1 = params.get('player_1')
        PLAYER_2 = params.get('player_2')
        console.log('player 1: ', PLAYER_1)
        console.log('player 2: ', PLAYER_2)
        let player_1_element = document.getElementById('team_1_player_right')
        let player_2_element = document.getElementById('team_2_player_right')
        player_1_element.innerHTML = PLAYER_1
        player_2_element.innerHTML = PLAYER_2
    } else {
        TEAM_1_PLAYER_1 = params.get('team_1_player_1')
        TEAM_1_PLAYER_2 = params.get('team_1_player_2')
        TEAM_2_PLAYER_1 = params.get('team_2_player_1')
        TEAM_2_PLAYER_2 = params.get('team_2_player_2')
        console.log('team 1 player 1: ', TEAM_1_PLAYER_1)
        console.log('team 1 player 2: ', TEAM_1_PLAYER_2)
        console.log('team 2 player 1: ', TEAM_2_PLAYER_1)
        console.log('team 2 player 2: ', TEAM_2_PLAYER_2)
        let team_1_player_1_element = document.getElementById('team_1_player_left')
        let team_1_player_2_element = document.getElementById('team_1_player_right')
        let team_2_player_1_element = document.getElementById('team_2_player_right')
        let team_2_player_2_element = document.getElementById('team_2_player_left')
        team_1_player_1_element.innerHTML = TEAM_1_PLAYER_1
        team_1_player_2_element.innerHTML = TEAM_1_PLAYER_2
        team_2_player_1_element.innerHTML = TEAM_2_PLAYER_1
        team_2_player_2_element.innerHTML = TEAM_2_PLAYER_2
    }
}

function addPoint(event) {
    let team_num = event.target.id.split('_')[1]
    console.log('add point: team ' + team_num)
    // get the current score
    let score = parseInt(event.target.innerHTML)
    // update the score
    let new_score = score + 1
    event.target.innerHTML = new_score.toString()
    console.log('new score: ', new_score)

    // check if the game is over
    if (new_score >= 21) {
        console.log('game over')
        console.log('winner: team ', team_num)
        // show the winner
        if (team_num === "1") {
            if (MATCH_TYPE === 'singles') {
                alert('比赛结束！' + PLAYER_1 + '获胜！')
            } else {
                alert('比赛结束！' + TEAM_1_PLAYER_1 + '/' + TEAM_1_PLAYER_2 + '获胜！')
            }
        } else {
            if (MATCH_TYPE === 'singles') {
                alert('比赛结束！' + PLAYER_2 + '获胜！')
            } else {
                alert('比赛结束！' + TEAM_2_PLAYER_1 + '/' + TEAM_2_PLAYER_2 + '获胜！')
            }
        }
        window.history.back()
    }

    // determine the players' positions
    if (MATCH_TYPE === 'singles') {
        if (new_score % 2 === 0 && CURRENT_STATE === 1 || new_score % 2 === 1 && CURRENT_STATE === 0) {
            console.log('serve at the other side')
            switchPlayers("1")
            switchPlayers("2")
            CURRENT_STATE = 1 - CURRENT_STATE  // switch the state
        } else {
            console.log('serve at the same side')
        }
    } else {
        // for doubles match
        if (LAST_SERVE_TEAM === team_num) {
            // the same team serves, switch the players, continue serving
            switchPlayers(team_num)
        }  // for different team serving, no need to switch players
        LAST_SERVE_TEAM = team_num
        CURRENT_STATE = new_score % 2
    }

    // determine the serve sign
    switchServeSign(team_num)
}

function switchPlayers(team_num) {
    console.log('switch players: team ' + team_num)
    let player_left = document.getElementById('team_' + team_num + '_player_left')
    let player_right = document.getElementById('team_' + team_num + '_player_right')
    let temp = player_left.innerHTML
    player_left.innerHTML = player_right.innerHTML
    player_right.innerHTML = temp
}

function switchServeSign(serve_team) {
    console.log('switch serve sign: team ' + serve_team)
    let serve_side = CURRENT_STATE === 0 ? 'right' : 'left'
    let serve_side_opposite = CURRENT_STATE === 0 ? 'left' : 'right'
    let serve_sign = document.getElementById('team_' + serve_team + '_sign_' + serve_side)
    let serve_sign_opposite = document.getElementById('team_' + serve_team + '_sign_' + serve_side_opposite)
    serve_sign.innerHTML = '<img src="serve.svg" alt=""/>'  // show the serve sign
    serve_sign_opposite.innerHTML = ''  // hide the serve sign

    let receive_team = serve_team === '1' ? '2' : '1'
    let receive_sign = document.getElementById('team_' + receive_team + '_sign_' + serve_side)
    let receive_sign_opposite = document.getElementById('team_' + receive_team + '_sign_' + serve_side_opposite)
    receive_sign.innerHTML = '<img src="receive.svg" alt=""/>'  // hide the receive sign
    receive_sign_opposite.innerHTML = ''  // show the receive sign
}