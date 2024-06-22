let MATCH_TYPE = ''
let PLAYER_1 = ''
let PLAYER_2 = ''
let TEAM_1_PLAYER_1 = ''
let TEAM_1_PLAYER_2 = ''
let TEAM_2_PLAYER_1 = ''
let TEAM_2_PLAYER_2 = ''

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
                alert('比赛结束！' + TEAM_1_PLAYER_1 + '和' + TEAM_1_PLAYER_2 + '获胜！')
            }
        } else {
            if (MATCH_TYPE === 'singles') {
                alert('比赛结束！' + PLAYER_2 + '获胜！')
            } else {
                alert('比赛结束！' + TEAM_2_PLAYER_1 + '和' + TEAM_2_PLAYER_2 + '获胜！')
            }
        }
        window.history.back()
    }

    // determine the players' positions
    if (MATCH_TYPE === 'singles') {
        if (new_score % 2 === 0) {
            console.log('serve at the right side')
            let player_names_elements = document.getElementsByClassName('player')
            for (let i = 0; i < player_names_elements.length; i++) {
                player_names_elements[i].innerHTML = ''
            }
            let player_1_element = document.getElementById('team_1_player_right')
            let player_2_element = document.getElementById('team_2_player_right')
            player_1_element.innerHTML = PLAYER_1
            player_2_element.innerHTML = PLAYER_2
        } else {
            console.log('serve at the left side')
            let player_names_elements = document.getElementsByClassName('player')
            for (let i = 0; i < player_names_elements.length; i++) {
                player_names_elements[i].innerHTML = ''
            }
            let player_1_element = document.getElementById('team_1_player_left')
            let player_2_element = document.getElementById('team_2_player_left')
            player_1_element.innerHTML = PLAYER_1
            player_2_element.innerHTML = PLAYER_2
        }
    } else {

    }
}