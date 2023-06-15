const getTournamentStreamQueueRequest = (tournamentId) => {
    return {
        query: `query getTournamentStreamQueue { tournament(id: ${tournamentId}) { streamQueue { id, sets { id, round, state, fullRoundText, slots { entrant { id, participants { player { id, gamerTag, prefix user { genderPronoun, location { country }, authorizations(types: [TWITTER, TWITCH]) { type url } } } } } } }, stream { streamName, streamId, streamLogo } } }}`
    }
}

const mapStreamQueueResults = (streamQueue) => {
    if (!streamQueue) {
        return null
    }
    return streamQueue.tournament.streamQueue.map(streamQueue => {
        return {
            id: streamQueue.id,
            streamName: streamQueue.stream.streamName,
            streamId: streamQueue.stream.streamId,
            sets: streamQueue.sets.map(set => {
                return {
                    id: set.id,
                    fullRoundText: set.fullRoundText,
                    players: set.slots.map(slot => {
                        const twitter = slot.entrant.participants[0].player.user.authorizations.find(authorizations => authorizations.type === "TWITTER")
                        const twitch = slot.entrant.participants[0].player.user.authorizations.find(authorizations => authorizations.type === "TWITCH")
                        return {
                            id: slot.entrant.participants[0].player.id,
                            name: slot.entrant.participants[0].player.gamerTag,
                            team: slot.entrant.participants[0].player.prefix,
                            pronoun: slot.entrant.participants[0].player.user.genderPronoun,
                            country: slot.entrant.participants[0].player.user.location.country,
                            twitter: twitter ? twitter.url.replace('https://twitter.com/','@') : '',
                            twitch: twitch ? twitch.url.replace('https://twitch.tv/', '') : '',
                        }
                    })
                }
            })
        }
    })
}

module.exports = { getTournamentStreamQueueRequest, mapStreamQueueResults};
