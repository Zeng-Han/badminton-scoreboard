window.onload = function() {
    console.log('preparation.js loaded')
}

function matchTypeSwitched() {
    console.log('match type switched')
    const radios = document.getElementsByName('match_type')
    const matchType = radios[0].checked ? 'singles' : 'doubles'

    const doublesNames = document.getElementById('doubles_player_names')
    const singlesNames = document.getElementById('singles_player_names')

    if (matchType === 'singles') {
        console.log('switched to singles')
        doublesNames.style.display = 'none'
        singlesNames.style.display = 'grid'
    } else {
        console.log('switched to doubles')
        singlesNames.style.display = 'none'
        doublesNames.style.display = 'grid'
    }
}

function formSubmitted(event) {
    event.preventDefault()

    console.log('form submitted')
    const radios = document.getElementsByName('match_type')
    const matchType = radios[0].checked ? 'singles' : 'doubles'
    const params = new URLSearchParams({ match_type: matchType })

    if (matchType === 'singles') {
        const player1 = document.getElementById('player_1').value.trim()
        const player2 = document.getElementById('player_2').value.trim()
        if (!player1 || !player2) {
            alert('\u8bf7\u8f93\u5165\u7403\u5458\u540d')
            return
        }

        console.log('player 1: ', player1)
        console.log('player 2: ', player2)
        params.set('player_1', player1)
        params.set('player_2', player2)
    } else {
        const team1Player1 = document.getElementById('team_1_player_1').value.trim()
        const team1Player2 = document.getElementById('team_1_player_2').value.trim()
        const team2Player1 = document.getElementById('team_2_player_1').value.trim()
        const team2Player2 = document.getElementById('team_2_player_2').value.trim()

        if (!team1Player1 || !team1Player2 || !team2Player1 || !team2Player2) {
            alert('\u8bf7\u8f93\u5165\u7403\u5458\u540d')
            return
        }

        console.log('team 1 player 1: ', team1Player1)
        console.log('team 1 player 2: ', team1Player2)
        console.log('team 2 player 1: ', team2Player1)
        console.log('team 2 player 2: ', team2Player2)
        params.set('team_1_player_1', team1Player1)
        params.set('team_1_player_2', team1Player2)
        params.set('team_2_player_1', team2Player1)
        params.set('team_2_player_2', team2Player2)
    }

    window.location.href = `match.html?${params.toString()}`
}
