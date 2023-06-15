const getTournamentListRequest = () => {
    return {
        query: `query getTournamentByUserWhereAdmin { currentUser { tournaments (query: { perPage: 50 }) { nodes { id, name, admins { id, name } } } } }`
    }
}

/**
 * Please note that as of wed 5 oct 2022, isCurrentUserAdmin filter on tournaments is broken
 */

module.exports = { getTournamentListRequest };

