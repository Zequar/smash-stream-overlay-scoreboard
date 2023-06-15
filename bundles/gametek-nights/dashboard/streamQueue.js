const tournamentListReplicant = nodecg.Replicant('tournamentListReplicant');
const streamQueueReplicant = nodecg.Replicant('streamQueueReplicant');
const selectedStationReplicant = nodecg.Replicant('selectedStationReplicant');

const p1ScoreReplicant = nodecg.Replicant('p1ScoreReplicant');
const p1NameReplicant = nodecg.Replicant('p1NameReplicant');
const p1SponsorReplicant = nodecg.Replicant('p1SponsorReplicant');
const p1TwitterReplicant = nodecg.Replicant('p1TwitterReplicant');

const p2ScoreReplicant = nodecg.Replicant('p2ScoreReplicant');
const p2NameReplicant = nodecg.Replicant('p2NameReplicant');
const p2SponsorReplicant = nodecg.Replicant('p2SponsorReplicant');
const p2TwitterReplicant = nodecg.Replicant('p2TwitterReplicant');

const roundReplicant = nodecg.Replicant('roundReplicant');

tournamentListReplicant.on('change', (value) => {
    if (value == undefined || value == null) {
        document.getElementById('connection-state').innerHTML = 'No tournaments found for this user 😔';
    }

    createTournamentSelection(value);
})

streamQueueReplicant.on('change', (value) => {
    if (value == undefined || value == null) {
        document.getElementById('connection-state').innerHTML = 'No tournaments found 😔';
    }
    
    const name = value.tournament.name;
    
    if (value.tournament.streamQueue == null) {
        document.getElementById('connection-state').innerHTML = 'No stream queue found for : ' + name + ' 😔';
        document.getElementById('stream-queue-sets').innerHTML = "No matches found.";
        document.getElementById('stream-select-buttons').innerHTML = "";
        return;
    } 
    document.getElementById('connection-state').innerHTML = 'Stream stations found for : ' + name;   
    const streamQueue = value.tournament.streamQueue;
    
    createStreamQueueSets(streamQueue[0].sets);
});

function loadSet(set) {
    roundReplicant.value = set.fullRoundText;

    if (set.slots[0].entrant) {
        p1ScoreReplicant.value = 0;
        p1NameReplicant.value = set.slots[0].entrant.participants[0].gamerTag;
        p1SponsorReplicant.value = set.slots[0].entrant.participants[0].prefix;
        p1TwitterReplicant.value = set.slots[0].entrant.participants[0].user.authorizations[0].url;
    }
    if (set.slots[1].entrant) {
        p2NameReplicant.value = set.slots[1].entrant.participants[0].gamerTag;
        p2SponsorReplicant.value = set.slots[1].entrant.participants[0].prefix;
        p2ScoreReplicant.value = 0;
        p2TwitterReplicant.value = set.slots[1].entrant.participants[0].user.authorizations[0].url;
    }
}

function createTournamentSelection(tournaments) {
    console.log('Creating Tournament Selection');

    document.getElementById('tournament-select-buttons').innerHTML = "";
    let select = document.createElement("select");
    select.setAttribute('class', 'customButton dropdown');
    select.setAttribute('id', 'tournament-select');

    tournaments.forEach((element) => {
        let option = document.createElement("option");
        option.innerHTML = element.name;
        option.setAttribute('value', element.id);
        select.appendChild(option);
    })
    document.getElementById('tournament-select-buttons').appendChild(select);

}

function createStreamQueueSets(sets) {
    console.log('Creating Stream Queue Sets');

    // clearing previous sets
    document.getElementById('stream-queue-sets').innerHTML = "";

    // looping on each set
    sets.forEach(element => {
        let box = document.createElement("div");
        let round = document.createElement("p");
        let players = document.createElement("div");
        let player1Tag = document.createElement("span");
        let player1Team = document.createElement("span");
        let VS = document.createElement("span");
        let player2Tag = document.createElement("span");
        let player2Team = document.createElement("span");
        let importButton = document.createElement("button");

        round.innerHTML = element.fullRoundText;
        box.setAttribute('class', 'streamQueueSetBox');
        player1Tag.setAttribute('class', 'playerTag');
        player2Tag.setAttribute('class', 'playerTag');
        player1Team.setAttribute('class', 'playerTeam');
        player2Team.setAttribute('class', 'playerTeam');
        round.setAttribute('class', 'round');
        VS.setAttribute('class', 'vs');
        importButton.setAttribute('class', 'customButton');
        importButton.addEventListener("click", function() {
            loadSet(element);
        });

        if  (element.slots[0].entrant) {
            player1Tag.innerHTML = element.slots[0].entrant.participants[0].gamerTag;
            player1Team.innerHTML = element.slots[0].entrant.participants[0].prefix ? element.slots[0].entrant.participants[0].prefix + ' ' : '';
        } else {
            player1Tag.innerHTML = '???';
            player1Team.innerHTML = ''
        }

        if  (element.slots[1].entrant) {
            player2Tag.innerHTML = element.slots[1].entrant.participants[0].gamerTag;
            player2Team.innerHTML = element.slots[1].entrant.participants[0].prefix ? element.slots[1].entrant.participants[0].prefix + ' ' : '';
        } else {
            player2Tag.innerHTML = '???';
            player2Team.innerHTML = ''
        }

        VS.innerHTML = ' VS ';
        importButton.innerHTML = 'Import';

        players.appendChild(player1Team);
        players.appendChild(player1Tag);
        players.appendChild(VS);
        players.appendChild(player2Team);
        players.appendChild(player2Tag);


        box.appendChild(round);
        box.appendChild(players);
        box.appendChild(importButton);
        document.getElementById('stream-queue-sets').appendChild(box);
    })
}

function createStreamQueueSelection(streamQueue) {
    
    console.log('Creating Stream Queue Selection');

    document.getElementById('stream-select-buttons').innerHTML = "";
    let select = document.createElement("select");
    select.setAttribute('class', 'customButton');
    select.setAttribute('id', 'station-select');

    streamQueue.forEach((element, index) => {
        let option = document.createElement("option");
        option.innerHTML = element.stream.streamName;
        option.setAttribute('value', index);
        select.appendChild(option);
    })
    document.getElementById('stream-select-buttons').appendChild(select);

    select.onchange = function() {
        console.log("Select changed");
        getQueueFromStation();
    };
}

function getQueueFromStation() {
    const streamQueue = streamQueueReplicant.value.tournament.streamQueue;
    const station = document.getElementById('station-select').value;
    createStreamQueueSets(streamQueue[station].sets);
}

const getUserForm = document.getElementById('get-tournaments');
getUserForm.addEventListener('submit', async () => {

    nodecg.sendMessage('get-tournaments', 'oui');
});



const getQueues = document.getElementById('look-for-queues-button');
getQueues.addEventListener('click', e => {
    createStreamQueueSelection(streamQueueReplicant.value.tournament.streamQueue);
});