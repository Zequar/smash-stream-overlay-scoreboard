const axios = require("axios");
//const pjson = require("../../package.json");
const {getTournamentListRequest} = require("./getTournamentListRequest");
const {getUserIdFromSecretRequest} = require("./getUserIdFromSecretRequest");
const {getTournamentStreamQueueRequest, mapStreamQueueResults, getStreamQueue} = require("./getTournamentStreamQueueRequest");
const { disableConsoleAlerts } = require("raven");
//const startGgSecret = pjson.START_GG_GQL_SECRET
const startGgSecret = '1bbbffeebaf0b9963a289e01011f8ca3';
//const startGgEndpoint = pjson.START_GG_GQL_ENDPOINT;
const startGgEndpoint = 'https://api.start.gg/gql/alpha';


const sendRequest = async (data) => {
    try {
        axios.defaults.headers = {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
        const result = await axios({
            url: startGgEndpoint,
            method: 'post',
            headers: {
                Authorization: `Bearer ${startGgSecret}`
            },
            data: data
        })
        return result.data.data
    } catch (error) {
        console.error(`An error occurred fetching start gg data : ${error}`)
        return undefined
    }
}

const getUserIdFromToken = async () => {
    return await sendRequest(getUserIdFromSecretRequest())
}
const getTournamentList = async () => {
    const results = await sendRequest(getTournamentListRequest())
    // workaround to only get events where user is admin
    return results.currentUser.tournaments.nodes.filter(tournament => Boolean(tournament.admins)).map(tournament => {
        return {id: tournament.id, name: tournament.name}
    })
}

const getTournamentStreamQueue = async (tournamentId) => {
    console.log('ici');
    return mapStreamQueueResults(await sendRequest(getTournamentStreamQueueRequest(tournamentId)));
}

module.exports = {getUserIdFromToken, getTournamentList, getTournamentStreamQueue}

/**
 * how to format graphql requests if you are lazy :
 * https://lingojam.com/TexttoOneLine
 * https://textedit.tools/remove-multiple-spaces
 */
