window.onload = function() {
    console.log('preparation.js loaded')
}

function matchTypeSwitched() {
    console.log('match type switched')
    // get the match type
    let radios = document.getElementsByName('match_type')
    let match_type = radios[0].checked ? 'singles' : 'doubles'
    if (match_type === 'singles') {
        console.log('switched to singles')
        // hide doubles player names and show singles player names
        let doubles_names = document.getElementById('doubles_player_names')
        let singles_names = document.getElementById('singles_player_names')
        doubles_names.style.display = 'none'
        singles_names.style.display = 'block'
    } else {
        console.log('switched to doubles')
        // hide singles player names and show doubles player names
        let singles_names = document.getElementById('singles_player_names')
        let doubles_names = document.getElementById('doubles_player_names')
        singles_names.style.display = 'none'
        doubles_names.style.display = 'block'
    }
}

function formSubmitted(event) {
    // prevent the form from submitting by default
    event.preventDefault()

    console.log('form submitted')
    // get the match type
    let radios = document.getElementsByName('match_type')
    let match_type = radios[0].checked ? 'singles' : 'doubles'
    if (match_type === 'singles') {
        console.log('match type: singles')
    } else {
        console.log('match type: doubles')
    }
    // get the player names
    let next_url = 'match.html?match_type=' + match_type // the URL to redirect to
    if (match_type === 'singles') {
        let player_1 = document.getElementById('player_1').value
        let player_2 = document.getElementById('player_2').value
        if (!player_1 || !player_2) {
            alert('请输入球员名！')
            return
        }
        console.log('player 1: ', player_1)
        console.log('player 2: ', player_2)
        next_url = next_url + '&player_1=' + player_1 + '&player_2=' + player_2
    } else {
        let team_1_player_1 = document.getElementById('team_1_player_1').value
        let team_1_player_2 = document.getElementById('team_1_player_2').value
        let team_2_player_1 = document.getElementById('team_2_player_1').value
        let team_2_player_2 = document.getElementById('team_2_player_2').value
        if (!team_1_player_1 || !team_1_player_2 || !team_2_player_1 || !team_2_player_2) {
            alert('请输入球员名！')
            return
        }
        console.log('team 1 player 1: ', team_1_player_1)
        console.log('team 1 player 2: ', team_1_player_2)
        console.log('team 2 player 1: ', team_2_player_1)
        console.log('team 2 player 2: ', team_2_player_2)
        next_url = next_url + '&team_1_player_1=' + team_1_player_1 +
            '&team_1_player_2=' + team_1_player_2 +
            '&team_2_player_1=' + team_2_player_1 +
            '&team_2_player_2=' + team_2_player_2
    }
    window.open(next_url, '_self')
}