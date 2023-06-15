	/* Player 1 */
    const p1NameReplicant = nodecg.Replicant('p1NameReplicant');
    const p1SponsorReplicant = nodecg.Replicant('p1SponsorReplicant');
    const p1TwitterReplicant = nodecg.Replicant('p1TwitterReplicant');
    const p1ScoreReplicant = nodecg.Replicant('p1ScoreReplicant');
    
    const p1Name = document.getElementById('p1-name');
    const p1Sponsor = document.getElementById('p1-sponsor');
    const p1Twitter = document.getElementById('p1-twitter');
    const p1Score = document.getElementById('p1-score');

    p1NameReplicant.on('change', value => {
        document.getElementById('p1-name').value = value;
    })
    p1SponsorReplicant.on('change', value => {
        document.getElementById('p1-sponsor').value = value;
    })
    p1TwitterReplicant.on('change', value => {
        document.getElementById('p1-twitter').value = value;
    })
    p1ScoreReplicant.on('change', value => {
        document.getElementById('p1-score').value = value;
    })

/* Player 2 */
    const p2NameReplicant = nodecg.Replicant('p2NameReplicant');
    const p2SponsorReplicant = nodecg.Replicant('p2SponsorReplicant');
    const p2TwitterReplicant = nodecg.Replicant('p2TwitterReplicant');
    const p2ScoreReplicant = nodecg.Replicant('p2ScoreReplicant');

    const p2Name = document.getElementById('p2-name');
    const p2Sponsor = document.getElementById('p2-sponsor');
    const p2Twitter = document.getElementById('p2-twitter');
    const p2Score = document.getElementById('p2-score');

    p2NameReplicant.on('change', value => {
        document.getElementById('p2-name').value = value;
    })
    p2SponsorReplicant.on('change', value => {
        document.getElementById('p2-sponsor').value = value;
    })
    p2TwitterReplicant.on('change', value => {
        document.getElementById('p2-twitter').value = value;
    })
    p2ScoreReplicant.on('change', value => {
        document.getElementById('p2-score').value = value;
    })


/* Casters */
    const c1NameReplicant = nodecg.Replicant('c1NameReplicant');
    const c2NameReplicant = nodecg.Replicant('c2NameReplicant');

    const c1Name = document.getElementById('c1-name');
    const c2Name = document.getElementById('c2-name');

    c1NameReplicant.on('change', value => {
        document.getElementById('c1-name').value = value;
    })
    c2NameReplicant.on('change', value => {
        document.getElementById('c2-name').value = value;
    })


/* Round */
const roundReplicant = nodecg.Replicant('roundReplicant');

const round = document.getElementById('round');

    roundReplicant.on('change', value => {
        document.getElementById('round').value = value;
    })

const textForm = document.getElementById('update-overlay');
textForm.addEventListener('submit', e => {
    e.preventDefault();
    p1NameReplicant.value = p1Name.value;
    p1SponsorReplicant.value = p1Sponsor.value;
    p1TwitterReplicant.value = p1Twitter.value;
    p1ScoreReplicant.value = p1Score.value;

    p2NameReplicant.value = p2Name.value;
    p2SponsorReplicant.value = p2Sponsor.value;
    p2TwitterReplicant.value = p2Twitter.value;
    p2ScoreReplicant.value = p2Score.value;

    c1NameReplicant.value = c1Name.value;
    c2NameReplicant.value = c2Name.value;

    roundReplicant.value = round.value;
})


const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', e => {
    e.preventDefault();
    p1NameReplicant.value = '';
    p1SponsorReplicant.value = '';
    p1TwitterReplicant.value = '';
    p1ScoreReplicant.value = '';

    p2NameReplicant.value = '';
    p2SponsorReplicant.value = '';
    p2TwitterReplicant.value = '';
    p2ScoreReplicant.value = '';

    c1NameReplicant.value = '';
    c2NameReplicant.value = '';

    roundReplicant.value = '';
    });

const swapButton = document.getElementById('swap-button');
swapButton.addEventListener('click', e => {
    const tempP1Name = document.getElementById('p1-name').value;
    const tempP1Sponsor = document.getElementById('p1-sponsor').value;
    const tempP1Twitter = document.getElementById('p1-twitter').value;
    const tempP1Score = document.getElementById('p1-score').value;
    
    document.getElementById('p1-name').value = document.getElementById('p2-name').value;
    document.getElementById('p1-sponsor').value = document.getElementById('p2-sponsor').value;
    document.getElementById('p1-twitter').value = document.getElementById('p2-twitter').value;
    document.getElementById('p1-score').value = document.getElementById('p2-score').value;

    document.getElementById('p2-name').value = tempP1Name;
    document.getElementById('p2-sponsor').value = tempP1Sponsor;
    document.getElementById('p2-twitter').value = tempP1Twitter;
    document.getElementById('p2-score').value = tempP1Score;
});