/* Player 1 */ 
const p1NameReplicant = nodecg.Replicant('p1NameReplicant');
const p1SponsorReplicant = nodecg.Replicant('p1SponsorReplicant');
const p1TwitterReplicant = nodecg.Replicant('p1TwitterReplicant');
const p1ScoreReplicant = nodecg.Replicant('p1ScoreReplicant');

p1NameReplicant.on('change', value => {
    document.getElementById('player-one').innerHTML = value;
})
p1SponsorReplicant.on('change', value => {
    document.getElementById('player-one-sponsor').innerHTML = value;
})
p1TwitterReplicant.on('change', value => {
    document.getElementById('player-one-twitter').innerHTML = value;
})
p1ScoreReplicant.on('change', value => {
    document.getElementById('player-one-score').innerHTML = value;
})

/* Player 2 */
const p2NameReplicant = nodecg.Replicant('p2NameReplicant');
const p2SponsorReplicant = nodecg.Replicant('p2SponsorReplicant');
const p2TwitterReplicant = nodecg.Replicant('p2TwitterReplicant');
const p2ScoreReplicant = nodecg.Replicant('p2ScoreReplicant');

p2NameReplicant.on('change', value => {
    document.getElementById('player-two').innerHTML = value;
})
p2SponsorReplicant.on('change', value => {
    document.getElementById('player-two-sponsor').innerHTML = value;
})
p2TwitterReplicant.on('change', value => {
    document.getElementById('player-two-twitter').innerHTML = value;
})
p2ScoreReplicant.on('change', value => {
    document.getElementById('player-two-score').innerHTML = value;
})

/* Casters */
const c1NameReplicant = nodecg.Replicant('c1NameReplicant');
const c2NameReplicant = nodecg.Replicant('c2NameReplicant');

c1NameReplicant.on('change', value => {
    if (value == null || value == undefined || value.length == 0) {
        document.getElementById('casters').innerHTML = c2NameReplicant.value;
    } else {
        document.getElementById('casters').innerHTML = value + ' & ' + c2NameReplicant.value;
    }
})
c2NameReplicant.on('change', value => {
    if (value == null || value == undefined || value.length == 0) {
        document.getElementById('casters').innerHTML = c1NameReplicant.value;
    } else {
        document.getElementById('casters').innerHTML = c1NameReplicant.value + ' & ' + value;
    }
})

const roundReplicant = nodecg.Replicant('roundReplicant'); 

roundReplicant.on('change', value => {
    document.getElementById('round-name').innerHTML = value;
})