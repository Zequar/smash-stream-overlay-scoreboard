'use strict';

module.exports = function (nodecg) {
	nodecg.Replicant('p1NameReplicant', {defaultValue: 'Player 1'});
	nodecg.Replicant('p1SponsorReplicant', {defaultValue: 'Team 1'});
	nodecg.Replicant('p1TwitterReplicant', {defaultValue: '@player1'});
	nodecg.Replicant('p1ScoreReplicant', {defaultValue: '1'});

	nodecg.Replicant('p2NameReplicant', {defaultValue: 'Player 2'});
	nodecg.Replicant('p2SponsorReplicant', {defaultValue: 'Team 2'});
	nodecg.Replicant('p2TwitterReplicant', {defaultValue: '@player2'});
	nodecg.Replicant('p2ScoreReplicant', {defaultValue: '1'});

	nodecg.Replicant('c1NameReplicant', {defaultValue: 'Caster 1'});
	nodecg.Replicant('c2NameReplicant', {defaultValue: 'Caster 2'});

	nodecg.Replicant('roundReplicant', {defaultValue: 'Current round'});

	nodecg.Replicant('tournamentListReplicant', {defaultValue: [{ id: 0, name: 'Tournament'}]});
	const tournamentListReplicant = nodecg.Replicant('tournamentListReplicant');
	nodecg.Replicant('streamQueueReplicant', {defaultValue: 'la stream queue'});
	nodecg.Replicant('selectedStationReplicant', {defaultValue: 0});
	const streamQueueReplicant = nodecg.Replicant('streamQueueReplicant');

	const {getTournamentList, getTournamentStreamQueue} = require("./startGg.js");

	nodecg.listenFor('get-tournaments', async(value, ack) => {		
			tournamentListReplicant.value = await getTournamentList();
    });

	nodecg.listenFor('get-queue', async (tournamentArg, ack) => {
		const { request, gql } = require('graphql-request');
        // Let's get those Smash.gg Informations!
            const endpoint = 'https://api.start.gg/gql/alpha'
            const query = gql`
            query ($tournamentId: ID!) {
                tournament(id: $tournamentId) {
                    name
                    streamQueue {
                        stream {
                            streamName
                        }
                        sets {
                            fullRoundText
                            slots {
                                entrant {
                                    name
                                    participants {
                                        gamerTag
                                        prefix
                                        user {
                                            genderPronoun
                                            location { 
                                                country
                                            }
                                            authorizations(types: [TWITTER]) {
                                                type
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },`
            const variables = {
                tournamentId: tournamentArg,
            };
            const requestHeaders = {
                authorization: 'Bearer ' + '1bbbffeebaf0b9963a289e01011f8ca3',
            };
			request(endpoint, query, variables, requestHeaders)
			.then(val => { 
                console.log(val);
				streamQueueReplicant.value = val;
			}).catch(error => {
                console.error(error);
            });
        // Error ?
        
    });
};